"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import Like from "@/lib/models/likeModel";
import Share from "@/lib/models/shareModel";
import Tweet from "@/lib/models/tweetModel";
import User from "@/lib/models/userModel";
import { TweetModes, TweetType } from "@/types/enums";
import { IModTweet, ITweet } from "@/types/models/tweet";
import { IExist } from "@/types/utils";
import {
  getLikesOfTweet,
  getSharesOfTweet,
  isLikedByUser,
  isSharedByUser,
} from "./likeShare";
import { IUser } from "@/types/models/user";
import { IShare } from "@/types/models/share";

export const postTweet = async (
  userId: string,
  tweet: string,
  tweetType: TweetType,
  tweetRefId: string | null
) => {
  try {
    const connect = await connectMongoDB();
    if (!connect) {
      console.log("Db not connected");
      return { status: 500 };
    }
    const newTweet: ITweet = await new Tweet({
      tweetContent: tweet,
      userId,
      tweetType,
      tweetRefId,
    });
    const result = await newTweet.save();
    if (result) {
      return {
        status: 200,
        tweet: {
          tweetId: newTweet._id.toString(),
          tweetContent: newTweet.tweetContent,
        },
      };
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
    if (!connect) {
      console.log("Db not connected");
      return { status: 500 };
    }
    const user: IExist | null = await User.exists({ _id: userId });
    const tweet: ITweet | null = await Tweet.findById(tweetId);
    if (!user || !tweet) {
      console.log("err: user or tweet not found");
      return { status: 500 };
    }
    if (tweet.userId.toString() !== user._id.toString()) {
      console.log("err: tweet not found");
      return { status: 500 };
    }
    await Tweet.deleteOne({ _id: tweetId });
    const res1 = await Like.deleteMany({ tweetId });
    const res2 = await Share.deleteMany({ tweetId });
    return {
      status: 200,
      likesDeleted: res1.deletedCount,
      sharesDeleted: res2.deletedCount,
    };
  } catch (err) {
    console.error(err);
    return { status: 500 };
  }
};

export interface ITweetProps {
  mode: TweetModes;
  cursor: Date;
  pageSize: number;
  sessionUserId: string | undefined;
  usernameToUse?: string | undefined;
  tweetRefId?: string | undefined;
}

export const getTweets = async (
  props: ITweetProps
): Promise<Array<IModTweet> | null> => {
  try {
    const { mode, cursor, pageSize, sessionUserId, usernameToUse, tweetRefId } =
      props;

    const connect = await connectMongoDB();

    if (!connect) {
      console.log("Db not connected");
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let matchCondition: any = {};

    switch (mode) {
      case TweetModes.all:
        matchCondition = { tweetType: TweetType.tweet };
        break;
      case TweetModes.account:
        if (usernameToUse) {
          const user: IUser | null = await User.findOne({
            username: usernameToUse,
          });
          const shares: IShare[] | null = await Share.find({
            userId: user?._id,
          });
          if (!user || !shares) {
            return null;
          }
          const tweetIds = shares.map((share) => share.tweetId);
          matchCondition = {
            $or: [{ userId: user._id }, { _id: { $in: tweetIds } }],
          };
        }
        break;
      case TweetModes.subTweet:
        if (tweetRefId) {
          const tweet: ITweet | null = await Tweet.findById(tweetRefId);
          if (!tweet) {
            return null;
          }
          matchCondition = {
            tweetRefId: tweet._id,
            tweetType: TweetType.subTweet,
          };
        }
        break;
      default:
        return null;
    }

    const tweets = await Tweet.aggregate([
      { $match: matchCondition },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $match: { createdAt: { $lt: cursor } } },
            { $limit: pageSize },
          ],
        },
      },
    ]);

    if (!tweets || tweets.length <= 0) {
      return null;
    }

    const tweetData = tweets[0].data;

    const users = await Promise.all(
      tweetData.map(async (tweet: ITweet) => await User.findById(tweet.userId))
    );

    const tweetPromises = tweetData.map(
      async (tweet: ITweet, index: number) => {
        const user = users[index];
        if (user) {
          const t: IModTweet = {
            _id: tweet._id.toString(),
            userId: tweet.userId.toString(),
            tweetContent: tweet.tweetContent,
            likes: (await getLikesOfTweet(tweet._id.toString())) || 0,
            shares: (await getSharesOfTweet(tweet._id.toString())) || 0,
            comments:
              (await Tweet.countDocuments({ tweetRefId: tweet._id })) || 0,
            username: user.username,
            nickname: user.nickname,
            image: user.image,
            likedBy: false,
            sharedBy: false,
            tweetType: tweet.tweetType,
            createdAt: tweet.createdAt,
          };
          if (sessionUserId) {
            [t.likedBy, t.sharedBy] = await Promise.all([
              isLikedByUser(sessionUserId, tweet._id.toString()),
              isSharedByUser(sessionUserId, tweet._id.toString()),
            ]);
          }
          return t;
        }
        return {};
      }
    );

    const tweetsToSend = await Promise.all(tweetPromises);

    return tweetsToSend;
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
    if (!connect) {
      console.log("Db not connected");
      return null;
    }
    const tweet: ITweet | null = await Tweet.findById(tweetId);
    const user: IUser | null = await User.findOne({ username: username });
    if (user && tweet) {
      const t: IModTweet = {
        _id: tweet._id.toString(),
        userId: tweet.userId.toString(),
        tweetContent: tweet.tweetContent,
        likes: (await getLikesOfTweet(tweet._id.toString())) || 0,
        shares: (await getSharesOfTweet(tweet._id.toString())) || 0,
        comments: (await Tweet.countDocuments({ tweetRefId: tweet._id })) || 0,
        username: user.username,
        nickname: user.nickname,
        image: user.image,
        likedBy: false,
        sharedBy: false,
        tweetType: tweet.tweetType,
        createdAt: tweet.createdAt,
      };
      if (sessionUserId) {
        [t.likedBy, t.sharedBy] = await Promise.all([
          await isLikedByUser(sessionUserId, tweet._id.toString()),
          await isSharedByUser(sessionUserId, tweet._id.toString()),
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
