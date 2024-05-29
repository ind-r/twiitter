'use client'
import { signOut } from 'next-auth/react'
export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-white text-2xl pl-0 p-3 ml-10"
    >SignOut</button>
  )
}
