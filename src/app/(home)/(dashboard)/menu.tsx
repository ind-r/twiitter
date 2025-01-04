import { K } from "@/lib/K";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LogoutInMenu from "./logout";
import ThemeChanger from "./theme-changer";

export default function Menu() {
  return (
    <div className="py-20 whitespace-nowrap text-black dark:text-white flex flex-col gap-5">
      <Link href={K.Links.home} className="text-2xl flex items-center">
        <FontAwesomeIcon className="pr-3" icon={faHouse} />
        <p>Home</p>
      </Link>
      <Link href={K.Links.settings} className="text-2xl flex items-center">
        <FontAwesomeIcon className="pr-3" icon={faGear} />
        <p>Settings</p>
      </Link>
      <ThemeChanger />
      <LogoutInMenu />
    </div>
  );
}
