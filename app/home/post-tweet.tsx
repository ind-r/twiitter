'use client'
import { TweetType } from "@/libs/models/tweetModel"
import { Session } from "next-auth"
import { useState } from "react"

const postTweet = async (tweets: Array<TweetType>) => {
  try {
    const response = await fetch("http://localhost:3000/api/tweets", {
      method: "POST",
      body: JSON.stringify(tweets),
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) {
      throw new Error('Failed to submit user data');
    }
    const result = await response.json();
    alert(result.message);

  } catch (err) {
    console.error(err);
  }
}

export default function PostTweet({ data }: { data: Session }) {

  const [tweet, setTweet] = useState("")

  const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setTweet(value);
  }

  const handleClick = async (e: Event | undefined) => {
    if (!e) return;
    e.preventDefault();
    if (data.user && data.user.name) {
      // look into why this cant use TweetType
      const tweetToPost: Array<any> = [{
        username: data.user.name,
        tweetContent: tweet,
        likes: 0,
        shares: 0,
      }]
      postTweet(tweetToPost);
    }
  }

  return (
    <div className="pt-2 text-white">
      <h1 className="ml-20 text-2xl">Tweet!</h1>
      <form className="ml-20 mr-3">
        <textarea
          onChange={handleChange}
          className="border-gray-600 border rounded-2xl w-full bg-black p-2" name="tweet">
        </textarea>
        <button onClick={() => { handleClick(event) }}>Post</button>
      </form>
      <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
    </div>
  )
}
