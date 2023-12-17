import SignOut from './signout'
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options'

export default async function DashboardProfile() {
  const data = await getServerSession(options)
  let isLoggedIn = false;
  // console.log(data);
  if (data) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  if (isLoggedIn && data) {
    return (
      <div className="mt-auto mb-10">
        <img
          className="float-left bg-white h-10 w-10 rounded-full"
          src={data.user.image}></img>
        <h1 className="text-white text-2xl p-3 ml-10">{data.user.name}</h1>
      <SignOut />
      </div>
    )
  } else {
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
}
