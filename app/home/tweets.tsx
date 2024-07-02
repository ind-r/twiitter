"use client";

import { getTweets } from "@/actions/actions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Tweet from "./tweet";
import { SessionType } from "../api/auth/[...nextauth]/options";
import { Spinner } from "./spinner";
import TweetSkel from "./tweet-skel";
import { TweetModes, fullTweet } from "@/actions/util";
// import Profile from "./profile/page";

export default function Tweets({
  data,
  mode,
}: {
  data: SessionType | null;
  mode: TweetModes;
}) {
  const [tweets, setTweets] = useState<fullTweet[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [click, setClick] = useState(false);
  const { ref, inView } = useInView();
  const [noMoreTweets, setNoMoreTweets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreTweets = async () => {
    setIsLoading(true);
    const nextPage = pagesLoaded + 1;
    const newTweets: Array<fullTweet> | undefined = await getTweets(
      mode,
      data?.user?.userId,
      nextPage,
      14,
    );
    if (newTweets) {
      // console.log(newTweets);
      setTweets((prevTweets: fullTweet[]) => [...prevTweets, ...newTweets]);
      setPagesLoaded(nextPage);
      if (newTweets.length === 0) {
        setNoMoreTweets(true);
      } else {
        setNoMoreTweets(false);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && !isLoading) {
      // console.log("scrolled to the end");
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
              likes={tweet.likes}
              shares={tweet.shares}
              likedBy={tweet.likedBy}
              sharedBy={tweet.sharedBy}
              data={data}
              mode={mode}
            />
          );
        })
      ) : (
        <>
          <TweetSkel />
          <TweetSkel />
          <TweetSkel />
        </>
      )}
      <div className="" ref={ref} onClick={() => setClick(!click)}>
        {!noMoreTweets ? (
          <>
            <TweetSkel />
            <Spinner />
          </>
        ) : (
          <h1 className="h-32 flex justify-center items-center font-semibold">
            NO MORE TWEETS
          </h1>
        )}
      </div>
    </>
  );
}
