import Tweets from "./tweets-container";
import { getServerSession, Session } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PostTweet from "./post-tweet";
import { TweetModes, TweetType } from "@/types/enums";
import { ReloadProvider } from "./ReloadContex";

export default async function Page() {
  const data: Session | null = await getServerSession(options);
  return (
    <ReloadProvider>
      {data && <PostTweet data={data} tweetType={TweetType.tweet} />}
      <Tweets data={data} mode={TweetModes.all} />
    </ReloadProvider>
  );
}
