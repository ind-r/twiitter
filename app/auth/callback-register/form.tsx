'use client'
import { SessionType } from '@/app/api/auth/[...nextauth]/options';
import SignOut from '@/app/home/signout';
import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

const submit = async (user: { username: string, nickname: string, email: string }) => {
  try {
    const apiUrl = process.env.NEXTAUTH_URL;
    if (!apiUrl) {
      throw new Error("NEXTAUTH_URL is not defined in the environment variables");
    }
    const response = await fetch(`${apiUrl}/api/users`, {
      method: 'PATCH',
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

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function getUser(user: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/users/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // if (!response.ok) {
    //   throw new Error('Failed to getUser');
    // }
    const result = await response.json();
    if (response.status === 404) {
      return false;
      // throw new Error('User Not found', result)
    } else if (response.status === 200) {
      return true;
    }
    return false
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default function Form({ data }: { data: SessionType }) {
  const [user, setUser] = useState({
    username: '',
    nickname: '',
    email: data.user.email
  })
  const [errors, setErrors] = useState({
    username: '',
    nickname: '',
  })

  const validateUser = async () => {
    let valid = true;
    let newErrors = { ...errors };


    let isUser = await getUser(user.username)
    if (isUser) {
      newErrors.username = 'Username already Exists'
      valid = false;
    } else if (user.username.includes("@") || (/\s/.test(user.username))) {
      newErrors.username = 'Username is invalid (cannot contain special characters)'
      valid = false;
    } else if (user.username.trim() === '') {
      newErrors.username = 'Username is required'
      valid = false;
    } else newErrors.username = '';

    if (user.nickname.trim() === '' || /\s/.test(user.nickname)) {
      newErrors.nickname = 'nickname is required'
      valid = false;
    } else newErrors.nickname = '';
    setErrors(newErrors);
    return valid;
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };


  return (
    <div>
      <form className="flex flex-col pt-8">
        <label htmlFor="username" className="text-xl my-2">Username</label>
        <input
          onChange={handleChange}
          id="username"
          type="username"
          autoComplete="on"
          className="rounded-lg p-1 text-black"
          name="username" />
        <div>{errors.username}</div>
        <label htmlFor="nickname" className="text-xl my-2">Nickname</label>
        <input
          onChange={handleChange}
          id="nickname"
          type="nickname"
          autoComplete="on"
          className="rounded-lg p-1 text-black"
          name="nickname" />
        <div>{errors.nickname}</div>
        <button onClick={async () => {
          if (await validateUser()) {
            submit(user);
            signOut();
          }
        }} type="button"
          className={`text-white rounded-lg p-2 mt-5 bg-red-800`}>
          Register
        </button>
      </form>
    </div>
  );
}
