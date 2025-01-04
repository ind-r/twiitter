import { getUserInfo } from "@/actions/users";

export default async function UserProfile({ username }: { username: string }) {
  const user = await getUserInfo(username);
  console.log(user);
  return (
    <div>
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src="https://storage.googleapis.com/kami-uploads-public/library-resource-egxYhSV74CxA-vdSy9m-google-classroom-banner-paint-splats-png"
          className="object-cover w-full h-full"
          alt="user banner"
        />
        <div className=""></div>
      </div>
    </div>
  );
}
