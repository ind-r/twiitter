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
}) {
  return (
    <article className="pt-2 text-white border-b dark:border-zinc-800">
      <Link href={`/${username}`}>
        <div className="h-[40px] w-[40px] float-left mt-2 ml-4 rounded-full overflow-hidden ">
          <Image
            width={100}
            height={100}
            alt="userImg"
            src={image.includes("http") ? image : "/default-user.png"}
          />
        </div>
        <div className="mr-6 pt-1 ml-16">
          <h1 className="inline font-semibold">{nickname} </h1>
          <h1 className="inline text-gray-600 text-sm">@{username}</h1>
        </div>
      </Link>
      <ThreeDots
        userTweetedThis={userTweetedThis}
        sessionUserId={sessionUserId}
        tweetId={tweetId}
      />
      <div className="mr-6 pb-1 ml-16">
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
