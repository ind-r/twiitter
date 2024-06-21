"use client";
import { changeNickName } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangeNick() {
  const router = useRouter();
  const { data, update } = useSession();

  const handleClick = async (e: FormData) => {
    const nick = e.get("nickname") as string;
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
        <Input type="text" placeholder="new nick" name="nickname" />
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
}
