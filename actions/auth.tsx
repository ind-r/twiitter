"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import User from "@/lib/models/userModel";
import { IUser } from "@/types/models/user";
import { hash } from "bcryptjs";

export const isEmailTakenAlready = async (email: string) => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const user: IUser | null = await User.findOne({ email });
      if (user) {
        return true;
      }
      return false;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const isUsernameTakenAlready = async (username: string) => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const user: IUser | null = await User.findOne({ username });
      if (user) {
        return true;
      }
      return false;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const registerUser = async (user: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const newUser = await new User({
        username: user.username,
        nickname: user.username,
        email: user.email,
        image: "default-user.png",
        password: await hash(user.password, 12),
      });
      console.log(newUser);
      newUser.save();
    }
  } catch (error) {
    console.error(error);
  }
};

export const completeRegistration = async (
  userO: { username: string; nickname: string },
  userId: string,
) => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const user: IUser | null = await User.findById(userId);
      // console.log(user);
      if (user) {
        user.username = userO.username;
        user.nickname = userO.nickname;
        user.save();
        console.log({ status: 200, message: "User saved" });

        return true;
      }
      console.log({ message: "User not found", status: 404 });
      return false;
    }
    console.log({ message: "Db Not Connected", status: 500 });
    return false;
  } catch (err) {
    console.log({ error: err, status: 500 });
  }
};
