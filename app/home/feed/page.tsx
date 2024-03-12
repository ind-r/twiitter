import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { SessionType, options } from '../../api/auth/[...nextauth]/options'
import PostTweet from '../post-tweet'
const Tweets = dynamic(() => import('../tweets'), {
  ssr: false,
})

export default async function Feed() {
  const data: SessionType | null = await getServerSession(options)
  return (<div className="text-white">
    {data &&
      <PostTweet data={data} />
    }
    <Suspense fallback={<p className="text-white text-4xl">Loading...</p>}>
      <Tweets data={data} mode="userFeed" />
    </Suspense>
  </div>)
}
