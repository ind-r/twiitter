"use client";
import { TweetModes } from "@/types/enums";
import LikeAndShareAndComment from "./(likeShare)/like-share-comment";
import Link from "next/link";
import ThreeDots from "./threeDots";
import Image from "next/image";

export default function Tweet({
  tweetContent,
  tweetId,
  username,
  nickname,
  image,
  likes,
  comments,
  shares,
  sessionUserId,
  likedBy,
  sharedBy,
  mode,
  userTweetedThis,
  createdAt,
  reTweetedBy,
}: {
  tweetContent: string;
  username: string;
  nickname: string;
  image: string;
  tweetId: string;
  likes: number;
  shares: number;
  comments: number;
  likedBy: boolean;
  sharedBy: boolean;
  sessionUserId: string | undefined;
  mode: TweetModes;
  userTweetedThis?: boolean;
  createdAt: Date;
  reTweetedBy?: string;
}) {
  return (
    <article
      className={`pt-2 dark:text-white ${
        mode === TweetModes.postTweet ? "" : "border-b dark:border-zinc-800"
      }`}
    >
      <Link href={`/${username}`}>
        <div className="h-[40px] w-[40px] float-left mt-2 ml-4 rounded-full overflow-hidden ">
          <Image
            width={100}
            height={100}
            alt="userImg"
            src={image.includes("http") ? image : "/default-user.png"}
          />
        </div>
        <div className="mr-6 pt-1 ml-16 flex items-center justify-between">
          <div>
            <h1 className="inline font-semibold">{nickname} </h1>
            <h1 className="inline text-gray-600 text-sm">@{username}</h1>
            {reTweetedBy !== undefined && (
              <h1 className="inline text-gray-600 text-sm">
                {" "}
                retweeted by {reTweetedBy}
              </h1>
            )}
          </div>
          <p className="inline text-gray-600 text-sm">
            {createdAt.toDateString()}
          </p>
        </div>
      </Link>
      {mode != TweetModes.postTweet && (
        <ThreeDots
          userTweetedThis={userTweetedThis}
          sessionUserId={sessionUserId}
          tweetId={tweetId}
        />
      )}
      <div className="mr-6 pb-1 ml-16 dark:text-white text-black">
        <h1>{tweetContent}</h1>
      </div>
      <LikeAndShareAndComment
        username={username}
        tweetId={tweetId}
        sessionUserId={sessionUserId}
        likes={likes}
        shares={shares}
        comments={comments}
        likedBy={likedBy}
        sharedBy={sharedBy}
        mode={mode}
      />
    </article>
  );
}
