"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface CardProps {
  auth: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function Card({ auth, loading, setLoading }: CardProps) {
  return (
    <div className="">
      <button
        className={`pr-4 mt-5 rounded-lg shadow shadow-borderGray text-white
          ${
            loading
              ? "cursor-not-allowed bg-gray-500"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          signIn(auth.toLowerCase());
          setLoading(false);
        }}
        role="button"
      >
        <Image
          src={`/${auth.toLowerCase()}.png`}
          height="64"
          width="64"
          alt=""
          className="inline mr-2"
        />
        Sign In with {auth}
      </button>
    </div>
  );
}
