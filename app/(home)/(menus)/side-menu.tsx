import SignOut from "@/app/signout";
import Link from "next/link";
import Menu from "../(dashboard)/menu";

export default function SideMenu({
  name,
  image,
  httpsImage,
}: {
  name: string;
  image: string;
  httpsImage: boolean;
}) {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen flex-col justify-between bg-white dark:bg-background w-2/3">
      <div className="px-4 py-6">
        <div>
          <Link
            href={`/` + name}
            className="flex items-center gap-2 p-4 dark:hover:bg-zinc-800 hover:bg-gray-50"
          >
            <img
              alt="img"
              src={httpsImage ? image : "default-user.png"}
              className="size-10 rounded-full object-cover h-10 w-10"
            />
            <p className="block font-medium dark:text-white">{name}</p>
          </Link>
        </div>

        <Menu />
      </div>
    </div>
  );
}
