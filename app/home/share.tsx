"use client";
import { shareUnshare } from "@/actions/actions";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTransition } from "react";

export default function Share({
  tweetId,
  sessionUserId,
  sharedBy,
}: {
  tweetId: string;
  sessionUserId: string;
  sharedBy: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  let color = " ";
  if (sharedBy) {
    color = "red";
  }
  return (
    <button
      onClick={() =>
        startTransition(() => shareUnshare(tweetId, sessionUserId))
      }
    >
      <FontAwesomeIcon color={color} className="float-left" icon={faRetweet} />
    </button>
  );
}
