import Tweet from './tweet'
import { TweetType } from '../../libs/models/tweetModel'
import ReloadCircle from './reload-circle'
import { getTweets } from "@/actions/actions"
import { SessionType } from '../api/auth/[...nextauth]/options';

export default async function Tweets({ data }: { data: SessionType }) {

  const tweets: Array<TweetType> | undefined = await getTweets();

  return (
    <div>
      <ReloadCircle />
      {(tweets) ? (
        tweets.reverse().map(
          (tweet: TweetType) => {
            return <Tweet
              key={tweet._id}
              tweetContent={tweet.tweetContent}
              tweetId={tweet._id}
              userId={tweet.userId}
              likes={tweet.likes}
              shares={tweet.shares}
              data={data}
            />
          }
        )
      ) : (<div>No Tweets</div>)}
    </div >
  )
}
