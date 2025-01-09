"use client";
import { Session } from "next-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "./spinner";
import { postTweet } from "@/actions/tweets";
import { TweetType } from "@/types/enums";
import TweetPopUp from "./tweet-popup";
import { useReloadUpdate } from "./ReloadContex";

export default function PostTweet({
  data,
  tweetType,
  tweetRefId,
}: {
  data: Session | null;
  tweetType: TweetType;
  tweetRefId?: string;
}) {
  const [isDisabled, setDisabled] = useState(false);
  const [tweet, setTweet] = useState<string>("");
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null);
  const updateReload = useReloadUpdate();
  function closePopup() {
    setPopupContent(null);
    updateReload();
  }
  let placeholderText = "";
  if (tweetType === TweetType.tweet) {
    placeholderText = "Whats Happening!";
  } else {
    placeholderText = "Comment Away!";
  }

  if (
    !data ||
    !data?.user ||
    !data?.user.image ||
    !data?.user.name ||
    !data?.user.userId ||
    !data?.user.nickname
  ) {
    return null;
  }

  const image: string = data.user.image;
  const username: string = data.user.name;
  const nickname: string = data.user.nickname;
  const httpsImage: boolean = image.includes("http") && image.includes("://");

  const postTweetSubmit = async () => {
    setDisabled(true);
    if (tweet.trim().length != 0) {
      let result = null;
      if (tweetType === TweetType.subTweet && tweetRefId) {
        result = await postTweet(
          data.user.userId,
          tweet,
          tweetType,
          tweetRefId
        );
      } else {
        result = await postTweet(data.user.userId, tweet, tweetType, null);
        if (result.status === 200 && result.tweet) {
          setPopupContent(
            <TweetPopUp
              username={username}
              nickname={nickname}
              image={image}
              tweetContent={tweet}
              tweetId={result.tweet.tweetId}
              closePopup={closePopup}
            />
          );
        }
      }
      if (result) {
        setTweet("");
      }
    } else {
      alert("Empty Tweet");
    }
    setDisabled(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Prevent newlines from being entered
    if (
      event.target.value.includes("\n") ||
      event.target.value.includes("\r") ||
      event.target.value.includes("\t")
    ) {
      event.preventDefault();
      return;
    }
    setTweet(event.target.value);
  };

  return (
    <div className="pt-6 border-b dark:border-zinc-800">
      <Image
        className="float-left h-10 w-10 rounded-full ml-4 "
        alt="userImage"
        height="100"
        width="100"
        src={httpsImage ? image : "/default-user.png"}
      />
      <form className="ml-20 mr-3">
        <textarea
          className="border-none dark:bg-zinc-950 rounded-xl p-2 w-full"
          rows={2}
          placeholder={placeholderText}
          onChange={handleInputChange}
          name="tweet"
        />

        <Spinner className={`${isDisabled ? "" : "hidden"}`} />

        <Button
          onClick={postTweetSubmit}
          variant="outline"
          className={`my-3 dark:text-white ${isDisabled ? "hidden" : ""}`}
          type="submit"
          disabled={isDisabled}
        >
          Post
        </Button>
      </form>
      {popupContent}
    </div>
  );
}
