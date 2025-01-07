"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import Like from "./like";
import Share from "./share";
import Link from "next/link";
import { TweetModes } from "@/types/enums";
import { K } from "@/lib/K";

export default function LikeAndShareComment({
  username,
  tweetId,
  sessionUserId,
  likes,
  shares,
  comments,
  likedBy,
  sharedBy,
  mode,
}: {
  username: string;
  tweetId: string;
  sessionUserId: string | undefined;
  likes: number;
  shares: number;
  comments: number;
  likedBy: boolean;
  sharedBy: boolean;
  mode: TweetModes;
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
            href={K.Links.signin}
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
            href={K.Links.signin}
            className="flex flex-col items-center cursor-pointer"
          >
            <FontAwesomeIcon className="float-left" icon={faRetweet} />
            <h1>{shares}</h1>
          </Link>
        )}
      </div>

      {mode !== TweetModes.full && (
        <div className="flex flex-col items-center">
          <Link href={`/${username}/tweet/${tweetId}`}>
            <FontAwesomeIcon
              color="gray-500"
              className="float-left"
              icon={faComment}
            />
          </Link>
          <h1>{comments}</h1>
        </div>
      )}
    </div>
  );
}
