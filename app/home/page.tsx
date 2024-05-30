import { Suspense } from 'react'
import Tweets from './tweets'
import { getServerSession } from 'next-auth'
import { SessionType, options } from '../api/auth/[...nextauth]/options'
import PostTweet from './post-tweet'

export default async function Home() {
  const data: SessionType | null = await getServerSession(options)
  return (
    <>
      {data &&
        <PostTweet data={data} />
      }
      <Suspense fallback={<p className="text-white text-4xl">Loading...</p>}>
        <Tweets data={data} />
      </Suspense>
    </>
  )
}

