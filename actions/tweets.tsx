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
import { IUser } from "@/types/models/user";

export const postTweet = async (
  userId: string,
  tweet: string
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
  tweetId: string
): Promise<{
  status: number;
  likesDeleted?: number;
  sharesDeleted?: number;
}> => {
  try {
    const connect = await connectMongoDB();
    const user: IExist | null = await User.exists({ _id: userId });
    const tweet: ITweet | null = await Tweet.findById(tweetId);
    if (user && tweet && tweet.userId === user._id) {
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
  page: number,
  pageSize: number,
  sessionUserId: string | undefined,
  userId?: string | undefined
): Promise<Array<IModTweet> | null> => {
  try {
    const connect = await connectMongoDB();
    let tweets: any | null = null;

    const commonPipeline = [
      {
        $sort: { createdAt: (-1 as 1) || -1 }, // Sort by createdAt in descending order
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ];

    if (mode === TweetModes.all) {
      tweets = await Tweet.aggregate(commonPipeline);
    } else if (mode === TweetModes.user && sessionUserId) {
      tweets = await Tweet.aggregate([
        { $match: { userId: sessionUserId } },
        ...commonPipeline,
      ]);
    } else if (mode === TweetModes.account && userId) {
      tweets = await Tweet.aggregate([
        { $match: { userId: userId } },
        ...commonPipeline,
      ]);
    }

    if (tweets && tweets.length > 0) {
      const tweetData = tweets[0].data;

      const users = await Promise.all(
        tweetData.map(
          async (tweet: ITweet) => await User.findById(tweet.userId)
        )
      );

      const tweetPromises = tweetData.map(
        async (tweet: ITweet, index: number) => {
          const user = users[index];
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
            if (sessionUserId) {
              [t.likedBy, t.sharedBy] = await Promise.all([
                await isLikedByUser(sessionUserId, tweet._id),
                await isSharedByUser(sessionUserId, tweet._id),
              ]);
            }
            return t;
          }
          return {};
        }
      );

      const tweetsToSend = await Promise.all(tweetPromises);

      return tweetsToSend;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getTweet = async (
  tweetId: string,
  username: string,
  sessionUserId?: string | undefined
): Promise<IModTweet | null> => {
  try {
    const connect = await connectMongoDB();
    const tweet: ITweet | null = await Tweet.findById(tweetId);
    const user: IUser | null = await User.findOne({ username: username });
    if (user && tweet) {
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
      if (sessionUserId) {
        [t.likedBy, t.sharedBy] = await Promise.all([
          await isLikedByUser(sessionUserId, tweet._id),
          await isSharedByUser(sessionUserId, tweet._id),
        ]);
      }
      return t;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
