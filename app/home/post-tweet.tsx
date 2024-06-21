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

  if (data.user.image && data.user.name) {
    const image: string = data.user.image;
    let httpsImage: boolean = image.includes("http") && image.includes("://");
    const name = data.user.name;

    const postTweetSubmit = async (e: FormData) => {
      setDisabled(true);
      await postTweet(name, e);
      setDisabled(false);
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
        <form action={postTweetSubmit} className="ml-20 mr-3">
          <Input
            className="border-none"
            placeholder="Whats happening!"
            name="tweet"
          />

          <Spinner className={`${isDisabled ? "" : "hidden"}`} />
          <Button
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
