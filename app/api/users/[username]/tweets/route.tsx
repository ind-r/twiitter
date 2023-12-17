import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from '../../../../../libs/models/userModel'
import mongoConnect from '../../../../../libs/MongooseConnect'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  try {
    const connect = await mongoConnect()
    if (connect) {
      const user: UserType | null = await User.findOne({ username });
      if (user) {
        return NextResponse.json({ likes: user.tweets }, { status: 200 })
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
