import { postTweet } from "@/actions/actions"
import { Session } from "next-auth"
import Image from 'next/image'

export default function PostTweet({ data }: { data: Session }) {
  if (data && data.user && data.user.name && data.user.image) {
    const postTweetSubmit = postTweet.bind(null, data.user.name);
    const image: string = data.user.image;
    let httpsImage: boolean = (image.includes("http") && image.includes("://"))
    const name = data.user.name

    return (
      <div className="pt-6 text-white">
        {(httpsImage) ?
          <Image
            className="float-left h-10 w-10 rounded-full ml-4 "
            alt="userImage"
            height="100"
            width="100"
            src={image} /> :
          <Image
            className="float-left h-16 w-16 border-4 ml-4"
            alt="userImage"
            height="100"
            width="100"
            src={"/default-user.png"} />
        }
        <form
          action={postTweetSubmit}
          className="ml-20 mr-3">
          <textarea
            className="border-gray-600 border rounded-2xl w-full bg-black p-2 resize-none h-32"
            name="tweet"
            placeholder="Tweet away!"
          >
          </textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-full font-extrabold mt-2"
          >Post</button>
        </form>
        <div className="h-[1px] w-full bg-gray-800 items-start mt-2"></div>
      </div>
    )
  }
}
