import { TweetType } from '../../libs/models/tweetModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'

const getTweet = async (tweetId: string) => {

  const res = await fetch(`http://localhost:3000/api/tweets/${tweetId}`, {
    // body: JSON.stringify({ tweetId }),
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await res.json();
  return result.tweet;
}

const getUserImage = async (username: string) => {

  const res = await fetch(`http://localhost:3000/api/users/${username}/image`, {
    // body: JSON.stringify({ tweetId }),
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await res.json();
  return result.image;
}

const getNickname = async (username: string) => {

  const res = await fetch(`http://localhost:3000/api/users/${username}/nickname`, {
    // body: JSON.stringify({ tweetId }),
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await res.json();
  return result.nickname;
}

export default async function Tweet({ tweetId }: { tweetId: string }) {
  const tweet: TweetType = await getTweet(tweetId)
  const { username, tweetContent, likes, shares } = tweet;

  const nickname = await getNickname(username);
  // const image = await getUserImage(username);
  // const nickname = "yolo"
  const image = ""

  return (
    <div className="pt-2 text-white">
      <div className="bg-white h-[50px] w-[50px] float-left mt-2 ml-3 rounded-full overflow-hidden">
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
        <div className="flex flex-col">
          <FontAwesomeIcon className="float-left" icon={faHeart} />
          <h1>{likes}</h1>
        </div>
        <div className="flex flex-col">
          <FontAwesomeIcon className="float-left" icon={faRetweet} />
          <h1>{shares}</h1>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
    </div>
  )
}
