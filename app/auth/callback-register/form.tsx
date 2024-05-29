'use client'
import { completeRegistration, isUsernameTakenAlready } from '@/actions/actions';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Form() {

  const { data: session, update } = useSession();
  const submit = async (newUser: { username: string, nickname: string }) => {
    if (session && session.user) {

      await completeRegistration(user, session.user.userId)
      await update({ name: user.username });
    }
    console.log(session);
  }

  const [user, setUser] = useState({
    username: '',
    nickname: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    nickname: '',
  })

  const validateUser = async () => {
    let valid = true;
    let newErrors = { ...errors };


    let isUsernameTaken = await isUsernameTakenAlready(user.username)
    if (isUsernameTaken) {
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
            await submit(user);
          }
        }} type="button"
          className={`text-white rounded-lg p-2 mt-5 bg-red-800`}>
          Register
        </button>
      </form>
    </div>
  );
}
