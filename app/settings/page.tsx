import { getServerSession } from "next-auth";
import { SessionType, options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Settings() {
  const data: SessionType | null = await getServerSession(options);

  if (data) {
    return <div></div>;
  } else {
    redirect("/");
  }
}
