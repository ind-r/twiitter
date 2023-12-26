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
      <div className="absolute right-0 h-screen w-[30%] flex flex-row">
        <div className="h-screen w-[1px] bg-gray-800 items-start"></div>
        <div className="h-screen basis-full flex flex-col items-center">
          <h1 className="text-white text-3xl">HELLO WOLRD</h1>
        </div>
      </div>
      <div className="flex flex-col pt-14 mr-[40%] h-screen overflow-y-scroll" id="feed">
        <div className="absolute left-[25%] w-[45%] top-0 pt-14 opacity-50 blur-md bg-black">
          <div className="h-[1px] w-full bg-gray-800 items-start"></div>
        </div>
        {data &&
          <PostTweet data={data} />
        }
        <Suspense fallback={<p className="text-white text-4xl">Loading...</p>}>
          <Tweets data={data} />
        </Suspense>
      </div>
    </div>
  )
}
