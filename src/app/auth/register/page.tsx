"use client";
import { registerUser } from "@/actions/auth";
import SignInCard from "../signincard";
import Form from "./form";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  async function submit(user: {
    username: string;
    password: string;
    email: string;
  }) {
    await registerUser(user);
    signIn("credentials", {
      redirect: true,
      email: user.email,
      password: user.password,
      callbackUrl: "/home",
    });
  }

  return (
    <div className="flex flex-col items-center text-white rounded-xl justify-center h-screen">
      <h1 className="text-5xl">Register</h1>
      <Form submit={submit} loading={loading} setLoading={setLoading} />
      <div className="flex flex-col pt-5">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-borderGray"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
      <SignInCard auth="Google" loading={loading} setLoading={setLoading} />
    </div>
  );
}
