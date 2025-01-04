import { Input } from "@/components/ui/input";

export default function SearchMenu() {
  return (
    <>
      <div className="h-full flex flex-col pt-2 dark:text-white">
        <div>
          <Input className="rounded-xl" placeholder="Search" />
        </div>
        <div className="border dark:border-zinc-800 rounded-lg mt-5 p-4">
          <h1 className="font-bold text-xl">Guide</h1>
          <ul className="[&_*]:my-3">
            <li>Home shows tweets from all users</li>
            <li>Profile Shows your tweets where you can delete them</li>
            <li>You can like and share any tweet</li>
            <li>
              In settings you can change your Nickname you can not change your
              username yet
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
