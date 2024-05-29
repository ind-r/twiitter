'use client'
import SignInCard from '../signincard'
import Form from './form'
import { signIn } from 'next-auth/react'

export default function Signin() {
  async function submit({ email, password }: { email: string, password: string }) {
    if (email.includes("@")) {
      const status = await signIn('credentials', {
        redirect: true,
        email,
        username: ' ',
        password,
        callbackUrl: '/'
      });
      console.log(status);
    } else {
      const status = await signIn('credentials', {
        redirect: true,
        email: ' ',
        username: email,
        password,
        callbackUrl: '/'
      });
      console.log(status);
    }
  };
  return (
    <div className="flex flex-col items-center text-white rounded-xl justify-center h-screen">
      <h1 className="text-5xl">Sign In</h1>
      <Form submit={submit} />
      <SignInCard auth="Google" />
    </div>
  )
}
//bg-gray-200
