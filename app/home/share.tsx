"use  client";
import { share } from "@/actions/likeShare";
import { ShareModes } from "@/types/enums";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useTransition } from "react";

export default function Share({
  tweetId,
  sessionUserId,
  sharedBy,
  shares,
}: {
  tweetId: string;
  sessionUserId: string;
  sharedBy: boolean;
  shares: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [shareCount, setShareCount] = useState(shares);
  const [isSharedBy, setIsSharedBy] = useState(sharedBy);
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          if (!isPending) {
            startTransition(() =>
              share(ShareModes.tweet, sessionUserId, tweetId),
            );
            setShareCount((prev) => (isSharedBy ? prev - 1 : prev + 1));
            setIsSharedBy(!isSharedBy);
          }
        }}
      >
        <FontAwesomeIcon
          color={isSharedBy ? "red" : "gray-500"}
          className="float-left"
          icon={faRetweet}
        />
      </button>
      <h1>{shareCount}</h1>
    </>
  );
}
