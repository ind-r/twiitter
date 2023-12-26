import { TweetType } from '../../libs/models/tweetModel'
import Like from './like'
import Share from './share'
import { getTweet, getUserImage, getNickname } from "../util"

export default async function Tweet({ tweetId, liked, shared, sessionUsername }: { tweetId: string, liked: number, sessionUsername: string, shared: number }) {
  const tweet: TweetType = await getTweet(tweetId)
  const { username, tweetContent, likes, shares } = tweet;
  const nickname = await getNickname(username);
  const { image } = await getUserImage(username);

  return (
    <div className="pt-2 text-white">
      <div className="bg-white h-[50px] w-[50px] float-left mt-2 ml-3 rounded-full overflow-hidden">
        <img src={image} />
      </div>
      <div className="mr-3 pt-1 pb-1 ml-20">
        <h1 className="inline">{nickname}  </h1>
        <h1 className="inline text-gray-600">@{username}</h1>
      </div>
      <div className="mr-3 pt-1 pb-1 ml-20">
        <h1>{tweetContent}</h1>
      </div>
      <div hidden={true} className="mr-3 pt-1 pb-1 ml-20 bg-red-500 rounded-xl">
        <img
          src={image}
          alt="Username"
        />
      </div>
      <div className="mr-3 pt-1 pb-1 ml-20 flex justify-evenly text-gray-700">
        <Like tweetId={tweetId} liked={liked} username={sessionUsername} likes={likes} />
        <Share tweetId={tweetId} shared={shared} username={sessionUsername} shares={shares} />
      </div>
      <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
    </div>
  )
}
