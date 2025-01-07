"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import User from "@/lib/models/userModel";
import { ISUser, IUser } from "@/types/models/user";
import { revalidatePath } from "next/cache";

export const getUserInfoByUsername = async (username: string) => {
  try {
    const connect = await connectMongoDB();
    if (!connect) {
      console.log("Db not connected");
      return null;
    }
    const user: IUser | null = await User.findOne({ username });
    if (user) {
      const userToSend: ISUser = {
        username: user.username,
        nickname: user.nickname,
        image: user.image,
        bio: user.bio,
      };
      return userToSend;
    }
    console.log("user not found");
    return null;
  } catch (err) {
    console.log(err);
  }
};
export const getUserInfo = async (userId: string) => {
  try {
    const connect = await connectMongoDB();
    if (!connect) {
      console.log("Db not connected");
      return null;
    }
    const user: IUser | null = await User.findById(userId);
    if (user) {
      const userToSend: ISUser = {
        username: user.username,
        nickname: user.nickname,
        image: user.image,
        bio: user.bio,
      };
      return userToSend;
    }
    console.log("user not found");
    return null;
  } catch (err) {
    console.log(err);
  }
};

export const changeNickName = async (
  userId: string,
  nickname: string
): Promise<{ status: number; message: string } | undefined> => {
  try {
    const connect = await connectMongoDB();

    if (!connect) {
      return { message: "Db Not Connected", status: 500 };
    }

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return { message: "User not found", status: 404 };
    }
    user.nickname = nickname;
    user.save();
    revalidatePath("/");
    return { status: 200, message: "User saved" };
  } catch (err) {
    console.log(err);
    return { message: "ERROR", status: 500 };
  }
};

export const changeBio = async (
  userId: string,
  bio: string
): Promise<{ status: number; message: string } | undefined> => {
  try {
    const connect = await connectMongoDB();

    if (!connect) {
      return { message: "Db Not Connected", status: 500 };
    }

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return { message: "User not found", status: 404 };
    }
    user.bio = bio;
    user.save();
    revalidatePath("/");
    return { status: 200, message: "User saved" };
  } catch (err) {
    console.log(err);
    return { message: "ERROR", status: 500 };
  }
};
