"use client";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutInMenu() {
  return (
    <button
      className="text-white text-2xl pl-0 p-3 ml-10 flex items-center"
      onClick={() => {
        signOut();
      }}
    >
      <FontAwesomeIcon color="white" className="pr-3" icon={faDoorClosed} />
      <p>Logout</p>
    </button>
  );
}
