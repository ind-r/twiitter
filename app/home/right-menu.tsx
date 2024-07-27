import { Input } from "@/components/ui/input";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function RightMenu() {
  return (
    <>
      <div className="h-full flex flex-col pt-2">
        <div>
          <Input className="rounded-xl" placeholder="Search" />
        </div>
        <div className="border border-borderGray rounded-lg mt-5 p-4">
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
