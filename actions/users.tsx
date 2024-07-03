"use server";

import connectMongoDB from "@/lib/MongooseConnect";
import User from "@/lib/models/userModel";
import { ISUser, IUser } from "@/types/models/user";
import { revalidatePath } from "next/cache";

export const getUserInfo = async (userId: string) => {
  try {
    const connect = await connectMongoDB();
    let user: IUser | null = await User.findById(userId);
    if (user) {
      let userToSend: ISUser = {
        username: user.username,
        nickname: user.nickname,
        image: user.image,
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
  nickname: string,
): Promise<{ status: number; message: string } | undefined> => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const user: IUser | null = await User.findById(userId);
      if (user) {
        user.nickname = nickname;
        user.save();
        revalidatePath("/");
        return { status: 200, message: "User saved" };
      }
      return { message: "User not found", status: 404 };
    }
    return { message: "Db Not Connected", status: 500 };
  } catch (err) {
    console.log(err);
    return { message: "ERROR", status: 500 };
  }
};
