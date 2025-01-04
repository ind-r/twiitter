import { Document } from "mongoose";

export interface ILike extends Document {
  userId: string;
  tweetId: string;
  commentId?: string;
}
export interface ISLike {
  userId: string;
  tweetId: string;
  commentId?: string;
}
