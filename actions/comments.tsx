"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import Comment from "@/lib/models/commentModel";
import Tweet from "@/lib/models/tweetModel";
import User from "@/lib/models/userModel";
import { IComment } from "@/types/models/comment";
import { ITweet } from "@/types/models/tweet";
import { IUser } from "@/types/models/user";

//fix this all

export const postComment = async (
  userId: string,
  tweetId: string,
  commentContent: string,
): Promise<{ status: number } | undefined> => {
  try {
    const connect = await connectMongoDB();
    const user: IUser | null = await User.findById(userId);
    const tweet: ITweet | null = await Tweet.findById(tweetId);
    if (user && tweet) {
      let newComment: IComment = await new Comment({
        userId,
        tweetId,
        commentContent,
      });
      let result = await newComment.save();
      if (result) {
        user.comments.push(result._id);
        tweet.comments.push(result._id);
        user.save();
        tweet.save();
        return { status: 200 };
      } else {
        console.log("err: posting the tweet!");
        return { status: 500 };
      }
    } else {
      console.log("err: while posting user not found");
      return { status: 500 };
    }
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
};

export const deleteComment = async (
  userId: string,
  tweetId: string,
  commentId: string,
): Promise<{ status: number } | undefined> => {
  try {
    const connect = await MongooseConnect();
    const user: UserType | null = await User.findById(userId);
    if (user) {
      const tweet: TweetType | null = await Tweet.findById(tweetId);
      if (tweet) {
        // Remove commentId from user's tweets
        user.comments = user.comments.filter((c) => c !== commentId);
        await user.save();

        // Remove commentId from all users' likes and shares
        const updateUsers = async (
          userIds: string[],
          field: "likes" | "shares",
        ) => {
          await Promise.all(
            userIds.map(async (usrId) => {
              const usr: UserType | null = await User.findById(usrId);
              if (usr) {
                usr[field] = usr[field].filter((twt) => twt !== tweetId);
                await usr.save();
              }
            }),
          );
        };

        await updateUsers(tweet.likes, "likes");
        await updateUsers(tweet.shares, "shares");

        // Delete the tweet
        await Tweet.findByIdAndDelete(tweetId);

        revalidatePath("/home");
        return { status: 200 };
      } else {
        console.log("err: tweet not found");
        return { status: 500 };
      }
    } else {
      console.log("err: user not found");
      return { status: 500 };
    }
  } catch (err) {
    console.error(err);
    return { status: 500 };
  }
};
