"use client";
import { deleteTweet } from "@/actions/tweets";
import { useReloadUpdate } from "./ReloadContex";
import { useState } from "react";

export default function DeleteTweet({
  sessionUserId,
  tweetId,
}: {
  sessionUserId: string;
  tweetId: string;
}) {
  const [loading, setLoading] = useState(false);
  const updateReload = useReloadUpdate();
  const handleClick = async () => {
    setLoading(true);
    await deleteTweet(sessionUserId, tweetId);
    updateReload();
    setLoading(false);
  };
  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={`text-red-600 p-2 cursor-pointer `}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
