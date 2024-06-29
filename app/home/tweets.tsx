import Tweet from "./tweet";
import { TweetType } from "../../libs/models/tweetModel";
import { getTweets } from "@/actions/actions";
import { SessionType } from "../api/auth/[...nextauth]/options";
import { LoadMore } from "./load-more";

export default async function Tweets({
  data,
  mode,
}: {
  data: SessionType | null;
  mode: 0 /* all tweets */ | 1 /* userTweets */;
}) {
  // const tweets: Array<TweetType> | undefined = await getTweets(
  //   mode,
  //   data?.user?.userId,
  //   1,
  //   10,
  // );

  return (
    <>
      {/* tweets?.length ? (
        tweets.map((tweet: TweetType) => {
          return (
            <Tweet
              key={tweet._id}
              tweetContent={tweet.tweetContent}
              tweetId={tweet._id.toString()}
              userId={tweet.userId}
              data={data}
              mode={mode}
            />
          );
        })
      ) : (
        <div className="text-center py-10 text-xl">No Tweets</div>
      ) */}
      <LoadMore data={data} mode={mode} />
    </>
  );
}
