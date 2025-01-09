import { TweetModes } from "@/types/enums";
import Tweet from "./tweet-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function TweetPopUp({
  username,
  nickname,
  image,
  tweetContent,
  tweetId,
  closePopup,
}: {
  username: string;
  nickname: string;
  image: string;
  tweetContent: string;
  tweetId: string;
  closePopup: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-950 rounded-lg p-4 w-96">
        <div className="flex justify-between items-center pb-8">
          <h1 className="font-bold text-xl">You just tweeted!</h1>
          <button className="text-red-500" onClick={closePopup}>
            <FontAwesomeIcon icon={faClose} className="h-4 w-4" />
          </button>
        </div>
        <Tweet
          tweetContent={tweetContent}
          username={username}
          nickname={nickname}
          image={image}
          tweetId={tweetId}
          likes={0}
          shares={0}
          comments={0}
          likedBy={false}
          sharedBy={false}
          mode={TweetModes.postTweet}
          sessionUserId={"sf"}
          createdAt={new Date()}
        />
      </div>
    </div>
  );
}
