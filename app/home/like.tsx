'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteLike, sendLike } from '../util'

const likeFunx = async (tweetId: string, username: string, liked: number) => {
  if (liked === 1) {
    const result = await deleteLike(tweetId, username);
  } else {
    const result = await sendLike(tweetId, username);
  }
}

export default function Like({ tweetId, username, likes, liked }: { tweetId: string, username: string, likes: number, liked: number }) {
  const router = useRouter();
  let [reactiveLiked, setReactiveLiked] = useState(liked);
  const [likesReactive, setLikesReactive] = useState(likes);
  const [color, setColor] = useState("gray-700")
  const handleClickNotLoggedIn = () => {
    router.push('/auth/signin')
  }

  useEffect(() => {
    if (liked === 1) {
      setColor("Red")
    } else {
      setColor("gray-700")
    }
  }, [liked])

  const handleClickLoggedIn = async () => {
    likeFunx(tweetId, username, reactiveLiked);
    if (reactiveLiked === 1) {
      setLikesReactive(likesReactive => likesReactive - 1);
      setReactiveLiked(0)
      setColor("gray-700");
    } else {
      setLikesReactive(likesReactive => likesReactive + 1);
      setReactiveLiked(1)
      setColor("Red");
    }
  }

  if (username === '') {
    return (
      <div onClick={handleClickNotLoggedIn} className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon className="float-left" icon={faHeart} />
        <h1>{likesReactive}</h1>
      </div>
    )
  } else {
    return (
      <div onClick={handleClickLoggedIn} className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon color={color} className="float-left" icon={faHeart} />
        <h1>{likesReactive}</h1>
      </div>
    )
  }
}
