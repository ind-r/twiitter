import { NextResponse, NextRequest } from "next/server";
import MongooseConnect from '../../../libs/MongooseConnect';
import Tweet, { TweetType } from '../../../libs/models/tweetModel';

export async function GET(request: NextRequest) {
  try {
    const connect = await MongooseConnect();
    // let tweet: TweetType = new Tweet({
    //   username: "walruii",
    //   tweetContent: "This is an epic tweet",
    //   likes: 500,
    //   shares: 500
    // })
    if (connect) {
      // Tweet.insertMany(tweet)
      let tweets: Array<TweetType> = await Tweet.find()
      if (tweets.length !== 0) {
        return NextResponse.json({ tweets }, { status: 200 })
      }
      return NextResponse.json({ "message": "Users Not Found" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Could Not connect to DB" }, { status: 500 })
  } catch (err) {
    return NextResponse.error()
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tweets }: { tweets: Array<TweetType> } = body;
  // console.log(tweets);
  // console.log(body);
  try {
    const connect = await MongooseConnect();
    if (connect) {
      let result = await Tweet.insertMany(body)
      result.forEach(resultTweet => {
        const id = resultTweet._id;
        fetch(`http://localhost:3000/api/users/${resultTweet.username}/tweets/`, {
          method: "POST",
          body: JSON.stringify({id}),
          headers: {
            'Content-Type': 'application/json',
          }
        })
      });
      if (result) {
        return NextResponse.json({ "message": "Tweet/s Added!" }, { status: 200 })
      }
      return NextResponse.json({ "message": "Tweet/s did not get added!" }, { status: 400 })
    }
    return NextResponse.json({ "message": "Could Not connect to DB." }, { status: 500 })
  } catch (err) {
    return NextResponse.error()
  }
}
