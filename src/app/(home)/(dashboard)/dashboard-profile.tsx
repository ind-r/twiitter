import Link from "next/link";
import { getServerSession } from "next-auth";
import { SessionType, options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Signin from "@/app/siginin";
import Image from "next/image";

export default async function DashboardProfile() {
  const data: SessionType | null = await getServerSession(options);
  if (!data) {
    return (
      <div className="p-8 mx-auto">
        <Signin />
      </div>
    );
  }
  const image: string = data.user.image;
  const httpsImage: boolean = image.includes("http") && image.includes("://");
  if (data.user.name === "0") {
    redirect("/auth/callback-register");
  }
  return (
    <Link
      href={`/` + data.user.name}
      className="flex items-center gap-2 p-4 dark:hover:bg-zinc-800 hover:bg-gray-50 rounded-lg justify-center"
    >
      <Image
        alt="img"
        width={100}
        height={100}
        src={httpsImage ? image : "default-user.png"}
        className="size-10 rounded-full object-cover h-10 w-10"
      />

      <div>
        <p className="text-xs dark:text-white">
          <strong className="block font-medium">{data.user.nickname}</strong>

          <span> @{data.user.name} </span>
        </p>
      </div>
    </Link>
  );
}
