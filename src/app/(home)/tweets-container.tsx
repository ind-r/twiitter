"use client";
import { useEffect, useRef, useState } from "react";
import Tweet from "./tweet-container";
import { SessionType } from "@/app/api/auth/[...nextauth]/options";
import { Spinner } from "./spinner";
import TweetSkel from "./tweet-skel";
import { TweetModes } from "@/types/enums";
import { IModTweet } from "@/types/models/tweet";
import { getTweets } from "@/actions/tweets";

export default function Tweets({
  username,
  data,
  mode,
  tweetRefId,
}: {
  username?: string | undefined;
  data: SessionType | null;
  mode: TweetModes;
  tweetRefId?: string;
}) {
  const [tweets, setTweets] = useState<IModTweet[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [noMoreTweets, setNoMoreTweets] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMoreTweets = async ({
      tweetRefId,
      username,
    }: {
      tweetRefId?: string;
      username?: string;
    }) => {
      if (isLoading) return;
      setIsLoading(true);
      const nextPage = pagesLoaded + 1;
      const newTweets: Array<IModTweet> | null = await getTweets({
        mode,
        page: nextPage,
        pageSize: 8,
        sessionUserId: data?.user.userId,
        usernameToUse: username,
        tweetRefId,
      });
      if (newTweets) {
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
    if (isLoading || noMoreTweets) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !noMoreTweets) {
          if (mode === TweetModes.all) {
            loadMoreTweets({});
          } else if (mode === TweetModes.account) {
            loadMoreTweets({ username });
          } else if (mode === TweetModes.subTweet && tweetRefId) {
            loadMoreTweets({ tweetRefId });
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    ref,
    isLoading,
    noMoreTweets,
    mode,
    data,
    username,
    tweetRefId,
    pagesLoaded,
  ]);
  return (
    <>
      {tweets?.length > 0 &&
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
              userTweetedThis={data?.user.userId === tweet.userId}
            />
          );
        })}
      <div ref={ref}>
        {!noMoreTweets ? (
          <>
            <TweetSkel />
            <Spinner />
          </>
        ) : (
          <h1 className="h-32 flex justify-center items-center dark:text-zinc-700">
            uh oh, no more tweets
          </h1>
        )}
      </div>
    </>
  );
}
