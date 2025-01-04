import { K } from "@/lib/K";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LogoutInMenu from "./logout";

export default function Menu() {
  return (
    <div className="py-10 whitespace-nowrap">
      <Link
        href={K.Links.home}
        className="text-white text-2xl pl-0 p-3 ml-10 flex items-center"
      >
        <FontAwesomeIcon color="white" className="pr-3" icon={faHouse} />
        <p>Home</p>
      </Link>
      <Link
        href={K.Links.settings}
        className="text-white text-2xl pl-0 p-3 ml-10 flex items-center"
      >
        <FontAwesomeIcon color="white" className="pr-3" icon={faGear} />
        <p>Settings</p>
      </Link>
      <LogoutInMenu />
    </div>
  );
}
