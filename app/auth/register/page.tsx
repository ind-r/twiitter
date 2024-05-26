'use client'
import SignInCard from '../signincard';
import Form from './form'
import { signIn } from 'next-auth/react';

export default async function Register() {

  async function submit(user: { username: string, password: string, email: string }) {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // if (!response.ok) {
      //   throw new Error('Failed to submit user data');
      // }
      const result = await response.json();
      console.log(result)

      if (response.status === 409) {
        alert('User already exists');
        throw new Error('User already exists', result)
      } else if (response.status === 200) {
        const status = await signIn('credentials', {
          redirect: true,
          email: user.email,
          password: user.password,
          callbackUrl: '/home'
        });
        console.log(status);

      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col items-center text-white rounded-xl justify-center h-screen">
      <h1 className="text-5xl">Register</h1>
      <Form submit={submit} />
      <SignInCard auth="Google" />

    </div>
  );
}
