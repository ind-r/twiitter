import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import TweetSkel from "../tweet-skel";
import Tweets from "../tweets-container";
import { redirect } from "next/navigation";
import { TweetModes } from "@/types/enums";
import { K } from "@/lib/K";
import UserProfile from "./user-profile";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const username = (await params).username;
  const data: SessionType | null = await getServerSession(options);
  if (!data || !username) {
    redirect(K.Links.signin);
  }
  return (
    <>
      <UserProfile username={username} />
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
        <Tweets data={data} mode={TweetModes.account} username={username} />
      </Suspense>
    </>
  );
}
