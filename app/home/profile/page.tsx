import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import PostTweet from "../post-tweet";
import ReloadCircle from "../reload-circle";
import { Suspense } from "react";
import TweetSkel from "../tweet-skel";
import Tweets from "../tweets";
import { redirect } from "next/navigation";

export default async function Profile() {
  const data: SessionType | null = await getServerSession(options);
  if (data) {
    return (
      <>
        {data && <PostTweet data={data} />}
        <ReloadCircle />
        <Suspense
          fallback={
            <>
              <TweetSkel />
              <TweetSkel />
              <TweetSkel />
              <TweetSkel />
              <TweetSkel />
            </>
          }
        >
          <Tweets data={data} mode={1} />
        </Suspense>
      </>
    );
  } else {
    redirect("/home");
  }
}
