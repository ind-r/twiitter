import { getServerSession, Session } from "next-auth";
import {  options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ProfileMenu from "./profile-menu";
import Signin from "@/app/siginin";

export default async function Profile() {
  const data: Session | null = await getServerSession(options);
  if (!data) {
    return <Signin />;
  }
  const image = data.user.image;
  const name = data.user.name
  if (!image|| !name){
    redirect("/")
  }
  const httpsImage: boolean = image.includes("http") && image.includes("://");
  if (data.user.name === "0") {
    redirect("/auth/callback-register");
  }
  return (
    <ProfileMenu image={image} httpsImage={httpsImage} name={name} />
  );
}
