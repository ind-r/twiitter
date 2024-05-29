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
        likes: 0,
        shares: 0,
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
