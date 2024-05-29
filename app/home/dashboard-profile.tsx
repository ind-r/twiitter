import SignOut from './signout'
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { SessionType, options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function DashboardProfile() {
  const data: SessionType | null = await getServerSession(options)
  if (data) {
    const image: string = data.user.image;
    let httpsImage: boolean = (image.includes("http") && image.includes("://"))
    const name = data.user.name
    if (data.user.name === "0") {
      redirect("/auth/callback-register")
    }
    return (
      <div className="mt-auto mb-10">
        {(httpsImage) ?
          <Image
            className="float-left bg-white h-16 w-16 rounded-full border-white border-4 "
            alt="userImage"
            height="100"
            width="100"
            src={image} /> :
          <Image
            className="float-left bg-white h-16 w-16 rounded-full border-white border-4 "
            alt="userImage"
            height="100"
            width="100"
            src={"/default-user.png"} />
        }
        <h1 className="text-white text-2xl p-3 ml-20">{name}</h1>
        <SignOut />
      </div>
    )
  }
  return (
    <div className="mt-auto mb-10">
      <Link
        className="text-white text-2xl pl-0 p-3 ml-10"
        href="/auth/signin"
      >LOGIN
      </Link>
    </div>
  )

}
