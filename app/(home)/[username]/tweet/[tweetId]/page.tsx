import { getTweet } from "@/actions/tweets";
import { options, SessionType } from "@/app/api/auth/[...nextauth]/options";
import PostTweet from "@/app/(home)/post-tweet";
import Tweet from "@/app/(home)/tweet-container";
import Tweets from "@/app/(home)/tweets-container";
import { TweetModes, TweetType } from "@/types/enums";
import { IModTweet } from "@/types/models/tweet";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

export default async function FullTweet({
  params: { username, tweetId },
}: {
  params: { username: string; tweetId: string };
}) {
  const data: SessionType | null = await getServerSession(options);
  const tweet: IModTweet | null = await getTweet(
    tweetId,
    username,
    data?.user?.userId
  );
  if (tweet) {
    return (
      <>
        <Tweet
          key={tweet._id}
          tweetContent={tweet.tweetContent}
          tweetId={tweet._id}
          username={tweet.username}
          nickname={tweet.nickname}
          image={tweet.image}
          likes={tweet.likes}
          shares={tweet.shares}
          likedBy={tweet.likedBy}
          sharedBy={tweet.sharedBy}
          sessionUserId={data?.user?.userId}
          mode={TweetModes.full}
        />
        <PostTweet
          data={data}
          tweetType={TweetType.subTweet}
          tweetRefId={tweetId}
        />
        <Tweets data={data} mode={TweetModes.subTweet} tweetRefId={tweetId} />
      </>
    );
  } else {
    notFound();
  }
}
