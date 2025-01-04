import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteTweet from "./DeleteTweet";

import { useState } from "react";

export default function ThreeDots({
  userTweetedThis,
  sessionUserId,
  tweetId,
}: {
  userTweetedThis?: boolean;
  sessionUserId?: string;
  tweetId: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative float-right m-4 p-4">
      <FontAwesomeIcon
        icon={faEllipsis}
        onClick={() => setMenuOpen(!menuOpen)}
        className="cursor-pointer"
      />
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 p-2 dark:bg-zinc-950 border 
        dark:border-zinc-800 rounded shadow-lg flex flex-col z-30"
        >
          <div className="p-2">Menu</div>
          {userTweetedThis && sessionUserId && (
            <DeleteTweet tweetId={tweetId} sessionUserId={sessionUserId} />
          )}
        </div>
      )}
    </div>
  );
}
