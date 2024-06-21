import { getServerSession } from "next-auth";
import { SessionType, options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChangeNick from "./changeNick";

export default async function Settings() {
  const data: SessionType | null = await getServerSession(options);

  if (data) {
    const username = data.user.name;
    const nickname = data.user.nickname;
    const image: string = data.user.image;
    let httpsImage: boolean = image.includes("http") && image.includes("://");
    if (username === "0") {
      redirect("/auth/callback-register");
    }

    return (
      <div className="container flex lg:flex-row flex-col pt-20 border broder-borderGray rounded-xl mt-20 p-10">
        <div className="basis-1/3 flex lg:flex-col justify-between">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <Link href="/home">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
        <div className="basis-2/3 md:block flex flex-col">
          {httpsImage ? (
            <Image
              className="float-right rounded-full"
              alt="userImage"
              height="100"
              width="100"
              src={image}
            />
          ) : (
            <Image
              className="float-right rounded-full"
              alt="userImage"
              height="100"
              width="100"
              src={"/default-user.png"}
            />
          )}
          <div className="flex items-center md:w-[80%]">
            <h1 className="text-lg font-semibold mr-10">Username:</h1>
            <h1> {username}</h1>
          </div>
          <div className="flex items-center md:w-[80%]">
            <h1 className="text-lg font-semibold mr-10">Nickname:</h1>
            <h1 className=""> {nickname}</h1>

            <ChangeNick />
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
