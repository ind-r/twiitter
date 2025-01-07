"use client";
import { useState } from "react";
import SignInCard from "../signincard";
import Form from "./form";
import { signIn } from "next-auth/react";

export default function Signin({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { error } = params;
  const [loading, setLoading] = useState(false);
  async function submit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    if (email.includes("@")) {
      const status = await signIn("credentials", {
        email,
        username: " ",
        password,
        callbackUrl: "/",
      });
      console.log(status);
    } else {
      const status = await signIn("credentials", {
        email: " ",
        username: email,
        password,
        callbackUrl: "/",
      });
      console.log(status);
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center text-white rounded-xl justify-center h-screen">
      <h1 className="text-5xl">Sign In</h1>
      <Form submit={submit} error={error} loading={loading} />
      <SignInCard auth="Google" loading={loading} setLoading={setLoading} />
    </div>
  );
}
//bg-gray-200
