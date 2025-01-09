import { getTweet } from "@/actions/tweets";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PostTweet from "@/app/(home)/post-tweet";
import Tweet from "@/app/(home)/tweet-container";
import Tweets from "@/app/(home)/tweets-container";
import { TweetModes, TweetType } from "@/types/enums";
import { IModTweet } from "@/types/models/tweet";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";

export default async function FullTweet({
  params,
}: {
  params: Promise<{ username: string; tweetId: string }>;
}) {
  const username = (await params).username;
  const tweetId = (await params).tweetId;
  const data: Session | null = await getServerSession(options);
  const tweet: IModTweet | null = await getTweet(
    tweetId,
    username,
    data?.user?.userId
  );
  if (!tweet) {
    notFound();
  }
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
        comments={tweet.comments}
        likedBy={tweet.likedBy}
        sharedBy={tweet.sharedBy}
        sessionUserId={data?.user?.userId}
        mode={TweetModes.full}
        createdAt={tweet.createdAt}
      />
      <PostTweet
        data={data}
        tweetType={TweetType.subTweet}
        tweetRefId={tweetId}
      />
      <Tweets data={data} mode={TweetModes.subTweet} tweetRefId={tweetId} />
    </>
  );
}
