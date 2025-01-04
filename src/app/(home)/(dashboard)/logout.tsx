"use client";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutInMenu() {
  return (
    <button
      className="dark:text-white text-2xl flex items-center"
      onClick={() => {
        signOut();
      }}
    >
      <FontAwesomeIcon className="pr-3" icon={faDoorClosed} />
      <p>Logout</p>
    </button>
  );
}
