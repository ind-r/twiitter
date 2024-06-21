import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "./signout";
import Link from "next/link";
import { SessionType, options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default async function DashboardDropdown() {
  const data: SessionType | null = await getServerSession(options);
  let image: string = "";
  let httpsImage: boolean = false;
  let name = "";
  if (data) {
    image = data.user.image;
    httpsImage = image.includes("http") && image.includes("://");
    name = data.user.name;
    if (data.user.name === "0") {
      redirect("/auth/callback-register");
    }
  }
  return (
    <div className="md:hidden block ml-auto mr-10 self-center text-white">
      <Link
        className="text-white text-xl font-extrabold pr-3"
        href="/auth/signin"
      >
        Signin
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FontAwesomeIcon icon={faBars} className="w-10 h-10" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {data && (
            <DropdownMenuItem>
              <div className="flex flex-row">
                <h1 className="text-white mr-2">{name}</h1>
                {httpsImage ? (
                  <Image
                    className="float-left h-5 w-5 rounded-full"
                    alt="userImage"
                    height="100"
                    width="100"
                    src={image}
                  />
                ) : (
                  <Image
                    className="float-left h-5 w-5 rounded-full "
                    alt="userImage"
                    height="100"
                    width="100"
                    src={"/default-user.png"}
                  />
                )}
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href="/home">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
