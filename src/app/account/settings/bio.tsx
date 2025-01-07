"use client";
import { changeBio } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Bio({ bio: initialBio }: { bio: string }) {
  const router = useRouter();
  const { data, update } = useSession();
  const [bio, setBio] = useState(initialBio);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (!bio || bio.trim() === "") {
      alert("bio cannot be empty");
      setLoading(false);
      return;
    }
    if (data) {
      const result = await changeBio(data.user.userId, bio);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (result?.status === 200) {
        const res = await update({
          bio: bio,
        });
        console.log(res);
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:w-[80%]">
      <h1 className="text-lg font-semibold mr-10">Bio:</h1>
      <h1 className="flex flex-wrap max-w-56"> {initialBio}</h1>
      <div className="ml-auto">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <textarea
            className="border dark:border-zinc-800 dark:bg-zinc-950 rounded-xl p-2 w-full"
            placeholder="Bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            disabled={loading}
            className={`${loading ? " cursor-not-allowed" : ""}`}
            onClick={handleClick}
          >
            {loading ? "Changing..." : "Change"}
          </Button>
        </div>
      </div>
    </div>
  );
}
