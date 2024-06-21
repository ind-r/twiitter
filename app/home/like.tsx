"use client";
import { likeDislike } from "@/actions/actions";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTransition } from "react";

export default function Like({
  tweetId,
  sessionUserId,
  likedBy,
}: {
  tweetId: string;
  sessionUserId: string;
  likedBy: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  let color = " ";
  if (likedBy) {
    color = "red";
  }
  return (
    <button
      onClick={() => startTransition(() => likeDislike(tweetId, sessionUserId))}
    >
      <FontAwesomeIcon color={color} className="float-left" icon={faHeart} />
    </button>
  );
}
