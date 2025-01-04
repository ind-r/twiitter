"use client";
import { Session } from "next-auth";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "./spinner";
import { postTweet } from "@/actions/tweets";
import { TweetType } from "@/types/enums";

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
  let placeholderText = "";
  if (tweetType === TweetType.tweet) {
    placeholderText = "Whats Happening!";
  } else {
    placeholderText = "Comment Away!";
  }

  if (data?.user.image && data.user.name) {
    const image: string = data.user.image;
    let httpsImage: boolean = image.includes("http") && image.includes("://");
    const name = data.user.name;

    const postTweetSubmit = async () => {
      setDisabled(true);
      let t = tweet.trim;
      if (tweet.trim().length != 0) {
        console.log(tweet);
        if (tweetType === TweetType.subTweet && tweetRefId) {
          await postTweet(data.user.userId, tweet, tweetType, tweetRefId);
        } else {
          await postTweet(data.user.userId, tweet, tweetType, null);
        }
      } else {
        alert("aww hell nah");
      }
      setDisabled(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        {httpsImage ? (
          <Image
            className="float-left h-10 w-10 rounded-full ml-4 "
            alt="userImage"
            height="100"
            width="100"
            src={image}
          />
        ) : (
          <Image
            className="float-left h-16 w-16 border-4 ml-4"
            alt="userImage"
            height="100"
            width="100"
            src={"/default-user.png"}
          />
        )}
        <form className="ml-20 mr-3">
          <Input
            className="border-none"
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
      </div>
    );
  }
}
