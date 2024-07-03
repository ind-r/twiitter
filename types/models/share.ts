import { Document } from "mongoose";

export interface IShare extends Document {
  userId: string;
  tweetId: string;
  commentId?: string;
}
export interface ISShare {
  userId: string;
  tweetId: string;
  commentId?: string;
}
