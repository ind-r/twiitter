"use server"

import MongooseConnect from "@/libs/MongooseConnect"
import Tweet, { TweetType } from "@/libs/models/tweetModel";
import User, { UserInfo, UserType } from "@/libs/models/userModel";
import { revalidatePath } from "next/cache";


export const postTweet = async (username: string, e: FormData,) => {

  try {
    const connect = await MongooseConnect();
    const user: UserType | null = await User.findOne({ username });
    if (user) {
      let newTweet: TweetType = await new Tweet({
        tweetContent: e.get("tweet"),
        userId: user._id,
        likes: [],
        shares: [],
      })
      let result = await newTweet.save();
      if (result) {
        user.tweets.push(result._id);
        user.save();
        revalidatePath("/home")
      } else {
        console.log("err: posting the tweet!")
      }
    } else {
      console.log("err: while posting user not found")
    }
  } catch (err) {
    console.log(err);
  }
}

export const getTweets = async () => {
  try {
    const connect = await MongooseConnect();
    let tweets: Array<TweetType> = await Tweet.find();
    return tweets;
  } catch (err) {
    console.log(err);
  }
}

export const getUserInfo = async (userId: string) => {
  try {
    const connect = await MongooseConnect();
    let user: UserType | null = await User.findById(userId);
    if (user) {
      let userToSend: UserInfo = {
        username: user.username,
        nickname: user.nickname,
        image: user.image,
      }
      return userToSend;
    }
    console.log("user not found")
    return null;
  } catch (err) {
    console.log(err);
  }
}

export const getLikesOfTweet = async (tweetId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    if (tweet) {
      return tweet.likes.length;
    }
    console.log("tweet not found")
    return null;
  } catch (err) {
    console.log(err);
  }

}

export const getSharesOfTweet = async (tweetId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    if (tweet) {
      return tweet.shares.length;
    }
    console.log("tweet not found")
    return null;
  } catch (err) {
    console.log(err);
  }
}

export const likeDislike = async (tweetId: string, userId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    let user: UserType | null = await User.findById(userId);
    if (tweet && user) {

      if (tweet.likes.includes(userId) && user.likes.includes(tweetId)) { // dislike
        let arr: string[] = tweet.likes.filter(function(item) {
          return item !== userId;
        })
        tweet.likes = arr;
        tweet.save();

        arr = user.likes.filter(function(item) {
          return item !== tweetId;
        })
        user.save();
      } else { // like
        tweet.likes.push(userId);
        tweet.save();
        user.likes.push(tweetId);
        user.save();
      }
    } else {
      console.log("tweet and/or User not found ")
    }
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/home")
}

export const shareUnshare = async (tweetId: string, userId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    let user: UserType | null = await User.findById(userId);
    if (tweet && user) {

      if (tweet.shares.includes(userId) && user.shares.includes(tweetId)) { // unshare
        let arr: string[] = tweet.shares.filter(function(item) {
          return item !== userId;
        })
        tweet.shares = arr;
        tweet.save();

        arr = user.shares.filter(function(item) {
          return item !== tweetId;
        })
        user.save();
      } else { // share
        tweet.shares.push(userId);
        tweet.save();
        user.shares.push(tweetId);
        user.save();
      }
    } else {
      console.log("tweet and/or User not found ")
    }
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/home")
}
export const getLikedBy = async (tweetId: string, userId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    let user: UserType | null = await User.findById(userId);
    if (tweet && user) {
      if (tweet.likes.includes(userId) && user.likes.includes(tweetId)) {
        return true;
      }
      return false;
    } else {
      console.log("tweet and/or User not found ")
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getSharedBy = async (tweetId: string, userId: string) => {
  try {
    const connect = await MongooseConnect();
    let tweet: TweetType | null = await Tweet.findById(tweetId);
    let user: UserType | null = await User.findById(userId);
    if (tweet && user) {
      if (tweet.shares.includes(userId) && user.shares.includes(tweetId)) {
        return true;
      }
      return false;
    } else {
      console.log("tweet and/or User not found ")
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

}
