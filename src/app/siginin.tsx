import { K } from "@/lib/K";
import Link from "next/link";

export default function Signin() {
  return (
    <Link
      className="border dark:border-zinc-800 rounded-lg p-3 dark:text-white"
      href={K.Links.signin}
    >
      <button>Sign-in</button>
    </Link>
  );
}
