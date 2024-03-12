import { Suspense } from 'react'
// import Tweets from './tweets'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { SessionType, options } from '../api/auth/[...nextauth]/options'
import PostTweet from './post-tweet'
const Tweets = dynamic(() => import('./tweets'), {
  ssr: false,
})

export default async function Home() {
  const data: SessionType | null = await getServerSession(options)
  return (
    <div>
      {data &&
        <PostTweet data={data} />
      }
      <Suspense fallback={<p className="text-white text-4xl">Loading...</p>}>
        <Tweets data={data} mode="home" />
      </Suspense>
    </div>
  )
}
