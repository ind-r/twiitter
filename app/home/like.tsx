import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useTransition } from 'react';
import { redirect } from 'next/navigation';

const likeDislike = async () => {

}

export default function Like({ tweetId, sessionUserId }: { tweetId: number, sessionUserId: string | null }) {
  let [isPending, startTransition] = useTransition();

  const handleClickNotLoggedIn = () => {
    redirect("/");
  }

  if (sessionUserId) {
    return (
      <button
        onClick={() => startTransition(() => likeDislike())}
        className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon color={"blue"} className="float-left" icon={faHeart} />
        <h1>{likes}</h1>
      </button>
    )
  } else {
    return (
      <div onClick={handleClickNotLoggedIn} className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon className="float-left" icon={faHeart} />
        <h1>{likes}</h1>
      </div>
    )
  }
}
