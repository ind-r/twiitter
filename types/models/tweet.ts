import { Document } from "mongoose";

export interface ITweet extends Document {
  userId: string;
  tweetContent: string;
}

export interface ISTweet {
  userId: string;
  tweetContent: string;
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
}
