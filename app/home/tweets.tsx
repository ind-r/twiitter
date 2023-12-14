import Tweet from './tweet'
import PostTweet from './post-tweet'
import { TweetType } from '../../libs/models/tweetModel'
import { Session, getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import ReloadCircle from './reload-circle'


const getTweets = async () => {
  const res = await fetch("http://localhost:3000/api/tweets", {
    // cache: "no-store"
  })
  const result = await res.json();
  return result.tweets;
}

export default async function Tweets() {

  let tweets: Array<TweetType> = await getTweets();
  const data: Session | null = await getServerSession(options)

  return (
    <div>
      {data &&
        <PostTweet data={data} />
      }
      <ReloadCircle />
      {tweets.reverse().map((tweet: TweetType) => (
        (tweet._id) ? (
          <Tweet key={tweet._id} tweetId={tweet._id} />) : (<div></div>)
      ))}
    </div >
  )
}
