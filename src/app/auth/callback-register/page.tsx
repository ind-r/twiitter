import { getServerSession } from "next-auth";
import Form from "./form";
import { SessionType, options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignOut from "@/app/signout";

export default async function Callback() {
  const data: SessionType | null = await getServerSession(options);

  if (data && data.user.name === "0") {
    return (
      <div className="flex flex-col items-center text-white rounded-xl justify-center h-screen">
        <h1 className="text-5xl">Finish Up Registering</h1>
        <Form />
        <SignOut />
      </div>
    );
  } else {
    redirect("/home");
  }
}
