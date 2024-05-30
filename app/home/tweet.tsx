import { UserInfo } from '@/libs/models/userModel'
import { getUserInfo } from '@/actions/actions'
import { SessionType } from '../api/auth/[...nextauth]/options';
import LikeAndShare from './likeAndShare';
import Link from 'next/link';

export default async function Tweet(
  {
    tweetContent,
    tweetId,
    userId,
    data
  }
    :
    {
      tweetContent: string,
      userId: string
      tweetId: string
      data: SessionType | null
    }
) {
  const tweetUser: UserInfo | undefined | null = await getUserInfo(userId);
  let sessionUserId: string | null = null;
  if (data && data.user && data.user.userId) {
    sessionUserId = data.user.userId;
  }
  if (tweetUser) {
    let { username, nickname, image } = tweetUser;
    return (
      <div className="pt-2 text-white">
        <div className="h-[40px] w-[40px] float-left mt-2 ml-4 rounded-full overflow-hidden">
          <img src={image} />
        </div>
        <div className="mr-6 pt-1 ml-16">
          <h1 className="inline">{nickname}  </h1>
          <h1 className="inline text-gray-600 text-sm">@{username}</h1>
        </div>
        <div className="mr-6 pb-1 ml-16">
          <h1>{tweetContent}</h1>
        </div>
        <Link
          href={image}
        >
          <img
            src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.rvSWtRd_oPRTwDoTCmkP5gHaE8%26pid%3DApi&f=1&ipt=e7b9e58ae470ca97e113c16d1c96b82c75b1c4cf113109e4e6bdd6e0a4cd03c4&ipo=images"}
            className="mr-6 ml-16 border border-gray-700 rounded-xl overflow-hidden"
            alt="Username"
          />
        </Link>
        <LikeAndShare
          tweetId={tweetId}
          sessionUserId={sessionUserId} />
        <div className="h-[1px] w-full bg-gray-800 items-start"></div>
      </div>
    )
  }
}
