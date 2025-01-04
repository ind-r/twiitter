import { Document } from "mongoose";
import { TweetType } from "../enums";

export interface ITweet extends Document {
  userId: string;
  tweetContent: string;
  tweetType: TweetType;
  tweetRefId?: string;
}

export interface ISTweet {
  userId: string;
  tweetContent: string;
  tweetType: TweetType;
  tweetRefId?: string;
}

export interface IModTweet {
  _id: string;
  tweetContent: string;
  likes: number;
  shares: number;
  username: string;
  nickname: string;
  image: string;
  likedBy: boolean;
  sharedBy: boolean;
  tweetType: TweetType;
  tweetRefId?: string;
}
