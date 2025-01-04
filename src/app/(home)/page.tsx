import Tweets from "./tweets-container";
import { getServerSession } from "next-auth";
import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import PostTweet from "./post-tweet";
import { TweetModes, TweetType } from "@/types/enums";

export default async function Page() {
  const data: SessionType | null = await getServerSession(options);
  return (
    <>
      {data && <PostTweet data={data} tweetType={TweetType.tweet} />}
      <Tweets data={data} mode={TweetModes.all} />
    </>
  );
}
