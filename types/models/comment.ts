import { Document } from "mongoose";

export interface IComment extends Document {
  userId: string;
  tweetId: string;
  commentContent: string;
}

export interface ISComment {
  userId: string;
  tweetId: string;
  commentContent: string;
}
