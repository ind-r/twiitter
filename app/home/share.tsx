'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const sendShare = async (tweetId: string, username: string, shared: number) => {
  if (shared === 1) {
    const res1 = await fetch(`http://localhost:3000/api/tweets/${tweetId}/shares`, {
      method: "DELETE",
    })
    const result1 = await res1.json();
    // return result.tweet;
    const res2 = await fetch(`http://localhost:3000/api/users/${username}/shares/${tweetId}`, {
      method: "DELETE",
    })
    const result2 = await res2.json();

  } else {
    const res1 = await fetch(`http://localhost:3000/api/tweets/${tweetId}/shares`, {
      method: "PUT",
    })
    const result1 = await res1.json();
    // return result.tweet;
    const res2 = await fetch(`http://localhost:3000/api/users/${username}/shares`, {
      method: "POST",
      body: JSON.stringify({ id: tweetId }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result2 = await res2.json();
  }
}

export default function share({ tweetId, username, shares, shared }: { tweetId: string, username: string, shares: number, shared: number }) {
  const router = useRouter();
  let [reactiveShared, setReactiveShared] = useState(shared);
  const [sharesReactive, setSharesReactive] = useState(shares);
  const [color, setColor] = useState("gray-700")
  const handleClickNotLoggedIn = () => {
    router.push('/auth/signin')
  }

  useEffect(() => {
    if (shared === 1) {
      setColor("Red")
    } else {
      setColor("gray-700")
    }
  }, [])

  const handleClickLoggedIn = async () => {
    sendShare(tweetId, username, reactiveShared);
    if (reactiveShared === 1) {
      setSharesReactive(sharesReactive - 1);
      setReactiveShared(0)
      setColor("gray-700");
    } else {
      setSharesReactive(sharesReactive + 1);
      setReactiveShared(1)
      setColor("Red");
    }
  }

  if (username === '') {
    return (
      <div onClick={handleClickNotLoggedIn} className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon className="float-left" icon={faRetweet} />
        <h1>{sharesReactive}</h1>
      </div>
    )
  } else {
    return (
      <div onClick={handleClickLoggedIn} className="flex flex-col items-center cursor-pointer">
        <FontAwesomeIcon color={color} className="float-left" icon={faRetweet} />
        <h1>{sharesReactive}</h1>
      </div>
    )
  }
}
