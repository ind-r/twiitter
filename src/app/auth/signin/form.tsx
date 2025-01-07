"use client";
import Link from "next/link";

import { useState } from "react";

interface Props {
  submit(user: { email: string; password: string }): void;
  loading: boolean;
  error: string;
}

export default function Form({ submit, error, loading }: Props) {
  const [user, setUser] = useState({ email: "", password: "" });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    // console.log(user);
  }

  return (
    <div>
      <form className="flex flex-col pt-8">
        <label htmlFor="email" className="text-xl my-2">
          Email or Username
        </label>
        <input
          onChange={handleChange}
          id="email"
          type="email"
          autoComplete="on"
          className="rounded-lg p-1 text-black"
          name="email"
        />
        <label htmlFor="password" className="text-xl my-2">
          Password
        </label>
        <input
          onChange={handleChange}
          id="password"
          type="password"
          autoComplete="on"
          className="rounded-lg p-1 text-black"
          name="password"
        />
        <button
          onClick={() => {
            submit(user);
          }}
          type="button"
          disabled={loading}
          className={`text-white rounded-lg p-2 mt-5
            ${
              loading
                ? "cursor-not-allowed bg-gray-500 "
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error === "CredentialsSignin" && (
          <ul className="list-disc px-6 pt-2">
            <li className="text-red-500">Invalid Credentials</li>
          </ul>
        )}
      </form>
      <div className="flex flex-col">
        <Link
          href="/auth/register"
          className="text-white bg-blue-500 rounded-lg p-2 mt-5 hover:bg-blue-600 text-center"
        >
          <button>Sign Up</button>
        </Link>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
