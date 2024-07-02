"use client";
import { postTweet } from "@/actions/actions";
import { Session } from "next-auth";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "./spinner";

export default function PostTweet({ data }: { data: Session }) {
  const [isDisabled, setDisabled] = useState(false);
  const [tweet, setTweet] = useState<string>("");

  if (data.user.image && data.user.name) {
    const image: string = data.user.image;
    let httpsImage: boolean = image.includes("http") && image.includes("://");
    const name = data.user.name;

    const postTweetSubmit = async () => {
      setDisabled(true);
      let t = tweet.trim;
      if (tweet.trim().length != 0) {
        console.log(tweet);
        await postTweet(name, tweet);
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
      <div className="pt-6 text-white">
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
            placeholder="Whats happening!"
            onChange={handleInputChange}
            name="tweet"
          />

          <Spinner className={`${isDisabled ? "" : "hidden"}`} />
          <Button
            onClick={postTweetSubmit}
            variant="outline"
            className={`my-3 ${isDisabled ? "hidden" : ""}`}
            type="submit"
            disabled={isDisabled}
          >
            Post
          </Button>
        </form>
        <div className="h-[1px] w-full bg-borderGray items-start mt-2"></div>
      </div>
    );
  }
}
