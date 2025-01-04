"use client";
import { like } from "@/actions/likeShare";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { experimental_useOptimistic as useOptimistic } from "react";

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
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { likes, sending: false },
    (state, newLikeCount: number) => ({
      ...state,
      likes: newLikeCount,
      sending: true,
    })
  );
  let color = " ";
  if (likedBy) {
    color = "red";
  }
  return (
    <>
      <button
        onClick={async () => {
          addOptimisticLike(optimisticLikes.likes + 1);
          await like(sessionUserId, tweetId);
        }}
      >
        <FontAwesomeIcon color={color} className="float-left" icon={faHeart} />
      </button>
      <h1>{optimisticLikes.likes}</h1>
    </>
  );
}
