"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import Like from "./like";
import Share from "./share";
import Link from "next/link";

export default function LikeAndShare({
  tweetId,
  sessionUserId,
  likes,
  shares,
  likedBy,
  sharedBy,
}: {
  tweetId: string;
  sessionUserId: string | null;
  likes: number;
  shares: number;
  likedBy: boolean;
  sharedBy: boolean;
}) {
  return (
    <div className="mr-6 mt-4 pb-1 ml-20 flex justify-evenly text-gray-700">
      <div className="flex flex-col items-center">
        {sessionUserId ? (
          <>
            <Like
              tweetId={tweetId}
              sessionUserId={sessionUserId}
              likedBy={likedBy}
              likes={likes}
            />
          </>
        ) : (
          <Link
            href="auth/signin"
            className="flex flex-col items-center cursor-pointer"
          >
            <FontAwesomeIcon className="float-left" icon={faHeart} />
            <h1>{likes}</h1>
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center">
        {sessionUserId ? (
          <>
            <Share
              tweetId={tweetId}
              sessionUserId={sessionUserId}
              sharedBy={sharedBy}
              shares={shares}
            />
          </>
        ) : (
          <Link
            href="auth/signin"
            className="flex flex-col items-center cursor-pointer"
          >
            <FontAwesomeIcon className="float-left" icon={faRetweet} />
            <h1>{likes}</h1>
          </Link>
        )}
      </div>
    </div>
  );
}

// not loged in
