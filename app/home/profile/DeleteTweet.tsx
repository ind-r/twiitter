"use client";
import { deleteTweet } from "@/actions/tweets";
import { Button } from "@/components/ui/button";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteTweet({
  userId,
  tweetId,
}: {
  userId: string;
  tweetId: string;
}) {
  const handleClick = async () => {
    await deleteTweet(userId, tweetId);
  };
  return (
    <div className="float-right m-4 p-4">
      <Button variant="destructive" onClick={handleClick}>
        <FontAwesomeIcon icon={faRemove} />
      </Button>
    </div>
  );
}
