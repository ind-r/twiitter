import { NextResponse, NextRequest } from "next/server";
import MongooseConnect from '../../../../libs/MongooseConnect';
import Tweet, { TweetType } from '../../../../libs/models/tweetModel';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const { id } = params;

  try {
    const connect = await MongooseConnect();
    if (connect) {
      let tweet : TweetType | null = await Tweet.findById(id)
      if (tweet) {

        return NextResponse.json({ tweet }, { status: 200 })
      }
      return NextResponse.json({ "message": "tweet Not Found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Could Not connect to DB" }, { status: 500 })
  } catch (err) {
    return NextResponse.error()
  }
}
