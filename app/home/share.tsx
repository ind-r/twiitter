'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteShare, sendShare } from '../util'

const shareFunx = async (tweetId: string, username: string, shared: number) => {
  if (shared === 1) {
    const result = await deleteShare(tweetId, username);
  } else {
    const result = await sendShare(tweetId, username);
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
    shareFunx(tweetId, username, reactiveShared);
    if (reactiveShared === 1) {
      setSharesReactive(sharesReactive => sharesReactive - 1);
      setReactiveShared(0)
      setColor("gray-700");
    } else {
      setSharesReactive(sharesReactive => sharesReactive + 1);
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
