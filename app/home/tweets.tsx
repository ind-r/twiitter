import Tweet from './tweet'
import PostTweet from './post-tweet'
import { TweetType } from '../../libs/models/tweetModel'
import { Session, getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import ReloadCircle from './reload-circle'
import { getTweets, getUser } from "../util"
import { UserType } from '@/libs/models/userModel'

export default async function Tweets() {

  let tweets: Array<TweetType> = await getTweets();
  const data: Session | null = await getServerSession(options)
  let user: UserType | null = null
  let username = ''
  if (data && data.user && data.user.name) {
    username = data.user.name
    user = await getUser(username);
  }
  return (
    <div>
      {data &&
        <PostTweet data={data} />
      }
      <ReloadCircle />
      {(tweets) ? (
        tweets.reverse().map((tweet: TweetType) => {
          let liked = -1
          let shared = -1
          if (user) {
            (user.likes.indexOf(tweet._id) !== -1) ?
              (liked = 1)
              :
              (liked = 0);
            (user.shares.indexOf(tweet._id) !== -1) ?
              (shared = 1)
              :
              (shared = 0);
          }
          return <Tweet key={tweet._id} tweetId={tweet._id} sessionUsername={username} liked={liked} shared={shared} />
        })
      )
        : (<div></div>)}
    </div >
  )
}
