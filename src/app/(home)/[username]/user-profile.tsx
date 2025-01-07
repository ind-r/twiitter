import { getUserInfoByUsername } from "@/actions/users";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserProfile({ username }: { username: string }) {
  const user = await getUserInfoByUsername(username);
  let image = "/default-user.png";
  if (!user) {
    redirect("/");
  }
  if (user.image && user.image.includes("http")) {
    image = user.image;
  }
  return (
    <div className="border-b dark:border-zinc-800">
      <div className="w-full h-[200px] overflow-hidden">
        <Image
          src="https://www.acemetrix.com/wp-content/uploads/2015/08/black-banner-vector.png"
          height={300}
          width={1800}
          className="object-cover w-full h-full"
          alt="user banner"
        />
      </div>
      <div className="px-10 min-h-[250px]">
        <Image
          src={image}
          height={200}
          width={200}
          alt="user image"
          className="w-32 h-32 rounded-full -mt-16 border-4"
        />
        <h1 className="text-2xl font-semibold pt-3">{user.nickname}</h1>
        <h1 className="text-gray-600">@{user.username}</h1>
        <h1 className="pt-3">{user.bio}</h1>
      </div>
    </div>
  );
}
