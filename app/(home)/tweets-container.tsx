"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Tweet from "./tweet-container";
import { SessionType } from "@/app/api/auth/[...nextauth]/options";
import { Spinner } from "./spinner";
import TweetSkel from "./tweet-skel";
import { TweetModes } from "@/types/enums";
import { IModTweet } from "@/types/models/tweet";
import { getTweets } from "@/actions/tweets";

export default function Tweets({
  userId,
  data,
  mode,
  tweetRefId,
}: {
  userId?: string | undefined;
  data: SessionType | null;
  mode: TweetModes;
  tweetRefId?: string;
}) {
  const [tweets, setTweets] = useState<IModTweet[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [click, setClick] = useState(false);
  const { ref, inView } = useInView();
  const [noMoreTweets, setNoMoreTweets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreTweets = async (idToUse?: string) => {
    setIsLoading(true);
    const nextPage = pagesLoaded + 1;
    const newTweets: Array<IModTweet> | null = await getTweets(
      mode,
      nextPage,
      8,
      data?.user?.userId,
      idToUse
    );
    if (newTweets) {
      // console.log(newTweets);
      setTweets((prevTweets: IModTweet[]) => [...prevTweets, ...newTweets]);
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
    if (inView && !isLoading && !noMoreTweets) {
      // console.log("scrolled to the end");
      if (mode === TweetModes.all) {
        loadMoreTweets();
      } else if (mode === TweetModes.user) {
        loadMoreTweets(data?.user?.userId);
      } else if (mode === TweetModes.account) {
        loadMoreTweets(userId);
      } else if (mode === TweetModes.subTweet && tweetRefId) {
        loadMoreTweets(tweetRefId);
      }
    }
  }, [inView, click]);
  return (
    <>
      {tweets?.length ? (
        tweets.map((tweet: IModTweet) => {
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
              sessionUserId={data?.user?.userId}
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
          <h1 className="h-32 flex justify-center items-center font-semibold dark:text-white">
            NO MORE TWEETS
          </h1>
        )}
      </div>
    </>
  );
}
