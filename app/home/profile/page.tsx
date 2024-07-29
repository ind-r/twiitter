import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import PostTweet from "../post-tweet";
import ReloadCircle from "../reload-circle";
import { Suspense } from "react";
import TweetSkel from "../tweet-skel";
import Tweets from "../tweets-container";
import { redirect } from "next/navigation";
import { TweetModes, TweetType } from "@/types/enums";

export default async function Profile() {
  const data: SessionType | null = await getServerSession(options);
  if (data) {
    return (
      <>
        {data && <PostTweet data={data} tweetType={TweetType.tweet} />}
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
          <Tweets data={data} mode={TweetModes.user} />
        </Suspense>
      </>
    );
  } else {
    redirect("/home");
  }
}
