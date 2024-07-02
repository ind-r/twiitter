import { Document } from "mongoose";

export enum TweetModes {
  allTweets = "allTweets",
  userTweets = "userTweets",
}

export interface fullTweet {
  _id: string;
  tweetContent: string;
  likes: number;
  shares: number;
  username: string;
  nickname: string;
  image: string;
  likedBy: boolean;
  sharedBy: boolean;
}

export interface SimpleTweet {
  userId: string;
  tweetContent: string;
  likes: string[];
  shares: string[];
}

export interface TweetType extends Document {
  userId: string;
  tweetContent: string;
  likes: string[];
  shares: string[];
}

export interface UserInfo {
  username: string;
  nickname: string;
  image: string;
}

export interface UserType extends Document {
  email: string;
  username: string;
  nickname: string;
  googleId?: string;
  tweets: string[];
  shares: string[];
  likes: string[];
  password: string;
  image: string;
}
