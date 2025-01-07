"use client";
import { changeNickName } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Nickname({
  nickname: initialNickname,
}: {
  nickname: string;
}) {
  const router = useRouter();
  const { data, update } = useSession();
  const [nickname, setNickname] = useState(initialNickname);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (!nickname || nickname.trim() === "") {
      alert("Nickname cannot be empty");
      setLoading(false);
      return;
    }
    if (data) {
      const result = await changeNickName(data.user.userId, nickname);
      if (result?.status === 200) {
        const res = await update({
          nickname: nickname,
        });
        console.log(res);
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:w-[80%]">
      <h1 className="text-lg font-semibold mr-10">Nickname:</h1>
      <h1 className=""> {initialNickname}</h1>

      <div className="ml-auto">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <input
            type="text"
            className="border dark:border-zinc-800 dark:bg-zinc-950 rounded-xl p-2 w-full"
            placeholder="New Nick"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            name="nickname"
          />
          <Button
            disabled={loading}
            className={loading ? "cursor-not-allowed" : ""}
            onClick={handleClick}
          >
            {loading ? "Changing..." : "Change"}
          </Button>
        </div>
      </div>
    </div>
  );
}
