import SignOut from "./signout";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { SessionType, options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardProfile() {
  const data: SessionType | null = await getServerSession(options);
  if (data) {
    const image: string = data.user.image;
    let httpsImage: boolean = image.includes("http") && image.includes("://");
    const name = data.user.name;
    if (data.user.name === "0") {
      redirect("/auth/callback-register");
    }
    return (
      <div className="hidden md:flex md:mt-auto md:mb-10 flex-row md:flex-col">
        <div>
          {httpsImage ? (
            <Image
              className="float-left h-10 w-10 rounded-full ml-10 "
              alt="userImage"
              height="100"
              width="100"
              src={image}
            />
          ) : (
            <Image
              className="float-left h-16 w-16 rounded-full "
              alt="userImage"
              height="100"
              width="100"
              src={"/default-user.png"}
            />
          )}
          <h1 className="text-white text-lg p-3 ml-20">@{name}</h1>
        </div>
        <div className="ml-20 pt-5">
          <SignOut />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-auto mb-10 hidden md:block">
      <Link
        className="text-white text-xl pt-5 ml-10 font-extrabold"
        href="/auth/signin"
      >
        Signin
      </Link>
    </div>
  );
}
