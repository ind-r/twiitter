"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="border dark:border-zinc-800 rounded-lg p-3 dark:text-white"
      onClick={() => signOut()}
    >
      Signout
    </button>
  );
}
