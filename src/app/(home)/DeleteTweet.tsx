"use client";
import { deleteTweet } from "@/actions/tweets";

export default function DeleteTweet({
  sessionUserId,
  tweetId,
}: {
  sessionUserId: string;
  tweetId: string;
}) {
  const handleClick = async () => {
    await deleteTweet(sessionUserId, tweetId);
  };
  return (
    <div onClick={handleClick} className="text-red-600 p-2">
      Delete
    </div>
  );
}
