"use client";

import { fullTweet, getTweets } from "@/actions/actions";
import { TweetType } from "@/libs/models/tweetModel";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Tweet from "./tweet";
import { SessionType } from "../api/auth/[...nextauth]/options";
import { Spinner } from "./spinner";

export function LoadMore({
  data,
  mode,
}: {
  data: SessionType | null;
  mode: 1 | 0;
}) {
  const [tweets, setTweets] = useState<fullTweet[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [click, setClick] = useState(false);
  const { ref, inView } = useInView();

  const loadMoreTweets = async () => {
    const nextPage = pagesLoaded + 1;
    const newTweets: Array<fullTweet> | undefined = await getTweets(
      mode,
      data?.user?.userId,
      nextPage,
      14,
    );
    console.log(newTweets);
    if (newTweets) {
      setTweets((prevTweets: fullTweet[]) => [...prevTweets, ...newTweets]);
      setPagesLoaded(nextPage);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("scrolled to the end");
      loadMoreTweets();
    }
  }, [inView, click]);
  return (
    <>
      {tweets?.length ? (
        tweets.map((tweet: fullTweet) => {
          return (
            <Tweet
              key={tweet._id}
              tweetContent={tweet.tweetContent}
              tweetId={tweet._id}
              username={tweet.username}
              nickname={tweet.nickname}
              image={tweet.image}
              data={data}
              mode={mode}
            />
          );
        })
      ) : (
        <div className="text-center py-10 text-xl">No Tweets</div>
      )}
      <div
        className="flex justify-center items-center p-4"
        ref={ref}
        onClick={() => setClick(!click)}
      >
        <Spinner />
      </div>
    </>
  );
}
