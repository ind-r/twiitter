"use client";
import { likeDislike } from "@/actions/actions";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useTransition } from "react";

export default function Like({
  tweetId,
  sessionUserId,
  likedBy,
  likes,
}: {
  tweetId: string;
  sessionUserId: string;
  likedBy: boolean;
  likes: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(likes);
  const [isLikedBy, setIsLikedBy] = useState(likedBy);
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          if (!isPending) {
            startTransition(() => likeDislike(tweetId, sessionUserId));
            setLikeCount((prev) => (isLikedBy ? prev - 1 : prev + 1));
            setIsLikedBy(!isLikedBy);
          }
        }}
      >
        <FontAwesomeIcon
          color={isLikedBy ? "red" : "gray-500"}
          className="float-left"
          icon={faHeart}
        />
      </button>
      <h1>{likeCount}</h1>
    </>
  );
}
