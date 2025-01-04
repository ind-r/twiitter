"use client";
import { changeNickName } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangeNick() {
  const router = useRouter();
  const { data, update } = useSession();

  const handleClick = async (e: FormData) => {
    const nick = e.get("nickname") as string;
    if (!nick || nick.trim() === "") {
      alert("Nickname cannot be empty");
      return;
    }
    if (data) {
      const result = await changeNickName(data.user.userId, nick);
      if (result?.status === 200) {
        const res = await update({
          nickname: nick,
        });
        console.log(res);
        router.refresh();
      }
    }
  };
  return (
    <form action={handleClick} className="ml-auto">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <input
          type="text"
          className="border-none bg-zinc-950 rounded-xl p-2 w-full"
          placeholder="New Nick"
          name="nickname"
        />
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
}
