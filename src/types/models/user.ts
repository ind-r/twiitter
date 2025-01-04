import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  username: string;
  nickname: string;
  googleId?: string;
  password: string;
  image: string;
}

export interface ISUser {
  username: string;
  nickname: string;
  image: string;
}
