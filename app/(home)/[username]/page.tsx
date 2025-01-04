import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import PostTweet from "../post-tweet";
import { Suspense } from "react";
import TweetSkel from "../tweet-skel";
import Tweets from "../tweets-container";
import { redirect } from "next/navigation";
import { TweetModes, TweetType } from "@/types/enums";
import { K } from "@/lib/K";

export default async function Profile() {
  const data: SessionType | null = await getServerSession(options);
  if (!data) {
    redirect(K.Links.signin);
  }
  return (
    <>
      {data && <PostTweet data={data} tweetType={TweetType.tweet} />}
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
}
