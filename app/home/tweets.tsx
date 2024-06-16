import Tweet from './tweet'
import { TweetType } from '../../libs/models/tweetModel'
import { getTweets } from "@/actions/actions"
import { SessionType } from '../api/auth/[...nextauth]/options';

export default async function Tweets({ data }: { data: SessionType | null }) {

  const tweets: Array<TweetType> | undefined = await getTweets();

  return (
    <>
      {(tweets?.length) ? (
        tweets.reverse().map(
          (tweet: TweetType) => {
            return <Tweet
              key={tweet._id}
              tweetContent={tweet.tweetContent}
              tweetId={tweet._id.toString()}
              userId={tweet.userId}
              data={data}
            />
          }
        )
      ) : (
        <div className="text-center py-10 text-xl">
          No Tweets
        </div>
      )}
    </ >
  )
}
