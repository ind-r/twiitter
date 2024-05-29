import { postTweet } from "@/actions/actions"
import { Session } from "next-auth"

export default function PostTweet({ data }: { data: Session }) {
  if (data && data.user && data.user.name) {
    const postTweetSubmit = postTweet.bind(null, data.user.name);

    return (
      <div className="pt-6 text-white">
        <h1 className="ml-20 text-2xl">Tweet</h1>
        <form
          action={postTweetSubmit}
          className="ml-20 mr-3">
          <textarea
            className="border-gray-600 border rounded-2xl w-full bg-black p-2" name="tweet">
          </textarea>
          <button type="submit">Post</button>
        </form>
        <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
      </div>
    )
  }
}
