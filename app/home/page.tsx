import { Suspense } from 'react'
// import Tweets from './tweets'
import dynamic from 'next/dynamic'
const Tweets = dynamic(() => import('./tweets'), {
    ssr: false,
})

export default function Home() {
  return (
    <div>
      <div className="absolute right-0 h-screen w-[30%] flex flex-row">
        <div className="h-screen w-[1px] bg-gray-800 items-start"></div>
        <div className="h-screen basis-full flex flex-col items-center">
          <h1 className="text-white text-3xl">HELLO WOLRD</h1>
        </div>
      </div>
      <div className="flex flex-col pt-12 mr-[40%] h-screen overflow-y-scroll" id="feed">
        <div className="absolute left-[25%] w-[45%]">
          <div className="h-[1px] w-full bg-gray-800 items-start"></div>
        </div>
        <Suspense fallback={<p className="text-white text-4xl">Loading...</p>}>
          <Tweets />
        </Suspense>
      </div>
    </div>
  )
}
