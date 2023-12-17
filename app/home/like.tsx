'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const sendLike = async (tweetId: string, username: string, liked: number) => {
  if (liked === 1) {
    const res1 = await fetch(`http://localhost:3000/api/tweets/${tweetId}/likes`, {
      method: "DELETE",
    })
    const result1 = await res1.json();
    // return result.tweet;
    const res2 = await fetch(`http://localhost:3000/api/users/${username}/likes/${tweetId}`, {
      method: "DELETE",
    })
    const result2 = await res2.json();

  } else {
    const res1 = await fetch(`http://localhost:3000/api/tweets/${tweetId}/likes`, {
      method: "PUT",
    })
    const result1 = await res1.json();
    // return result.tweet;
    const res2 = await fetch(`http://localhost:3000/api/users/${username}/likes`, {
      method: "POST",
      body: JSON.stringify({ id: tweetId }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result2 = await res2.json();
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
  }, [])

  const handleClickLoggedIn = async () => {
    sendLike(tweetId, username, reactiveLiked);
    if (reactiveLiked === 1) {
      setLikesReactive(likesReactive - 1);
      setReactiveLiked(0)
      setColor("gray-700");
    } else {
      setLikesReactive(likesReactive + 1);
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
