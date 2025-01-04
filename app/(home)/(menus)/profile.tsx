import { getServerSession } from "next-auth";
import { SessionType, options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ProfileMenu from "./profile-menu";
import Signin from "@/app/siginin";

export default async function Profile() {
  const data: SessionType | null = await getServerSession(options);
  if (!data) {
    return <Signin />;
  }
  const image: string = data.user.image;
  let httpsImage: boolean = image.includes("http") && image.includes("://");
  if (data.user.name === "0") {
    redirect("/auth/callback-register");
  }
  return (
    <ProfileMenu image={image} httpsImage={httpsImage} name={data.user.name} />
  );
}
