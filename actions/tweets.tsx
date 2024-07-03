"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import Like from "@/lib/models/likeModel";
import Share from "@/lib/models/shareModel";
import Tweet from "@/lib/models/tweetModel";
import User from "@/lib/models/userModel";
import { TweetModes } from "@/types/enums";
import { IModTweet, ITweet } from "@/types/models/tweet";
import { IExist } from "@/types/utils";
import { revalidatePath } from "next/cache";
import {
  getLikesOfTweet,
  getSharesOfTweet,
  isLikedByUser,
  isSharedByUser,
} from "./likeShare";

export const postTweet = async (
  userId: string,
  tweet: string,
): Promise<{ status: number } | undefined> => {
  try {
    const connect = await connectMongoDB();
    let newTweet: ITweet = await new Tweet({
      tweetContent: tweet,
      userId,
    });
    let result = await newTweet.save();
    if (result) {
      revalidatePath("/");
      return { status: 200 };
    } else {
      console.log("err: posting the tweet!");
      return { status: 500 };
    }
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
};

export const deleteTweet = async (
  userId: string,
  tweetId: string,
): Promise<{
  status: number;
  likesDeleted?: number;
  sharesDeleted?: number;
}> => {
  try {
    const connect = await connectMongoDB();
    const user: IExist | null = await User.exists({ _id: userId });
    const tweet: IExist | null = await Tweet.exists({ _id: tweetId });
    if (user && tweet) {
      await Tweet.deleteOne({ _id: tweetId });
      const res1 = await Like.deleteMany({ tweetId });
      const res2 = await Share.deleteMany({ tweetId });
      return {
        status: 200,
        likesDeleted: res1.deletedCount,
        sharesDeleted: res2.deletedCount,
      };
    } else {
      console.log("err: tweet not found");
      return { status: 500 };
    }
  } catch (err) {
    console.error(err);
    return { status: 500 };
  }
};

export const getTweets = async (
  mode: TweetModes,
  userId: string | undefined,
  page: number,
  pageSize: number,
): Promise<Array<IModTweet> | null> => {
  try {
    const connect = await connectMongoDB();
    let tweets: any | null = null;
    if (mode === TweetModes.allTweets) {
      tweets = await Tweet.aggregate([
        {
          $sort: { createdAt: -1 }, // Sort by createdAt in descending order
        },
        {
          $facet: {
            metadata: [{ $count: "totalCount" }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          },
        },
      ]);
    } else if (TweetModes.userTweets && userId) {
      tweets = await Tweet.aggregate([
        {
          $sort: { createdAt: -1 }, // Sort by createdAt in descending order
        },
        {
          $match: { userId: userId },
        },
        {
          $facet: {
            metadata: [{ $count: "totalCount" }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          },
        },
      ]);
    }
    if (tweets) {
      const tweetsToSend = await Promise.all(
        tweets[0].data.map(async (tweet: ITweet) => {
          const user = await User.findById(tweet.userId);
          if (user) {
            let t: IModTweet = {
              _id: tweet._id.toString(),
              tweetContent: tweet.tweetContent,
              likes: (await getLikesOfTweet(tweet._id)) || 0,
              shares: (await getSharesOfTweet(tweet._id)) || 0,
              username: user.username,
              nickname: user.nickname,
              image: user.image,
              likedBy: false,
              sharedBy: false,
            };
            if (userId) {
              if (await isLikedByUser(userId, tweet._id)) {
                t.likedBy = true;
              }
              if (await isSharedByUser(userId, tweet._id)) {
                t.sharedBy = true;
              }
            }
            return t;
          }
          return {};
        }),
      );
      // console.log(tweetsToSend);
      return tweetsToSend;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
