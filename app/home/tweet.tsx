import { UserInfo } from '@/libs/models/userModel'
import { getUserInfo } from '@/actions/actions'
import { SessionType } from '../api/auth/[...nextauth]/options';
import LikeAndShare from './likeAndShare';

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
        <LikeAndShare
          tweetId={tweetId}
          sessionUserId={sessionUserId} />
        <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
      </div>
    )
  }
}
