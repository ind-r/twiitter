import { Document } from "mongoose";

export interface IUser extends Document {
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
