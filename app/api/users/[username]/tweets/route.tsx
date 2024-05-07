import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../../../libs/models/userModel'
import mongoConnect from '../../../../../libs/MongooseConnect'
import { TweetType } from "@/libs/models/tweetModel";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        const tweetPromises = user.tweets.map(async (tweet) => {
          const apiUrl = process.env.API_URL;
          if (!apiUrl) {
            throw new Error("API_URL is not defined in the environment variables");
          }
          const res = await fetch(`${apiUrl}/api/tweets/${tweet}`, {
            cache: "no-store",
          });
          const result = await res.json();
          return result.tweet; // Return the tweet for inclusion in the Promise.all array
        });
        let tweets: Array<TweetType> = await Promise.all(tweetPromises);
        return NextResponse.json({ tweets }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
  } catch (err) {

    return NextResponse.json({ error: err }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const body = await request.json();
  const { id } = body;
  try {
    // console.log(body);
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        // const userLikes = user.likes;
        // userLikes.push(id);
        // user.likes = userLikes;
        user.tweets.push(id);
        user.save();
        return NextResponse.json({ likes: user.tweets }, { status: 200 })
      }
      return NextResponse.json({ "message": "User not found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Db Not Connected" }, { status: 500 })
    // return NextResponse.json({ id }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ "message": err }, { status: 500 })
  }
}
