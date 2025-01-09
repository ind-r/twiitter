import { Document, ObjectId } from "mongoose";
import { TweetType } from "../enums";

export interface ITweet extends Document {
  _id: ObjectId;
  userId: string;
  tweetContent: string;
  tweetType: TweetType;
  tweetRefId?: string;
  createdAt: Date;
}

export interface ISTweet {
  userId: string;
  tweetContent: string;
  tweetType: TweetType;
  tweetRefId?: string;
}

export interface IModTweet {
  _id: string;
  userId: string;
  tweetContent: string;
  likes: number;
  shares: number;
  comments: number;
  username: string;
  nickname: string;
  image: string;
  likedBy: boolean;
  sharedBy: boolean;
  tweetType: TweetType;
  tweetRefId?: string;
  createdAt: Date;
}
