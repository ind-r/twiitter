"use client";
import { deleteTweet } from "@/actions/tweets";
import { Button } from "@/components/ui/button";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="float-right m-4 p-4">
      <Button variant="destructive" onClick={handleClick}>
        <FontAwesomeIcon icon={faRemove} />
      </Button>
    </div>
  );
}
