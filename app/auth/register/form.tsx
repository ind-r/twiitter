'use client'
import { useState, useEffect } from 'react';

interface Props {
  submit(user: { username: string, password: string, email: string }): void;
}
async function getUser(user: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${user}`, {
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

export default function Form({ submit }: Props) {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    verifyPassword: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    verifyPassword: ''
  })
  const [verify, setVerify] = useState(false)

  const validateUser = async () => {
    let valid = true;
    let newErrors = { ...errors };


    let isUser = await getUser(user.username)

    if (isUser) {
      newErrors.username = 'Username already Exists'
      valid = false;
    } else if (user.username.includes("@") || /\s/.test(user.username)) {
      newErrors.username = 'Username is invalid (cannot contain special characters)'
      valid = false;
    } else if (user.username.trim() === '') {
      newErrors.username = 'Username is required'
      valid = false;
    } else newErrors.username = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    } else newErrors.email = '';

    // Validate password
    if (user.password.length < 2) {
      newErrors.password = 'Password must be at least 2 characters';
      valid = false;
    } else newErrors.password = '';

    if (/\s/.test(user.password)) {
      newErrors.password = 'Password must not have spaces';
      valid = false;
    } else newErrors.password = '';

    // Validate verify password
    if (user.verifyPassword !== user.password) {
      newErrors.verifyPassword = 'Passwords do not match';
      valid = false;
    } else newErrors.verifyPassword = '';

    setErrors(newErrors);
    return valid;
  }

  useEffect(() => {
    // let validation: boolean = validateUser()
    // setVerify(validation);
  }, [user])

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
        <label htmlFor="email" className="text-xl my-2">Email</label>
        <input
          onChange={handleChange}
          id="email"
          type="email"
          autoComplete="on"
          className="rounded-lg p-1 text-black"
          name="email" />
        <div>{errors.email}</div>
        <label htmlFor="password" className="text-xl my-2">Password</label>
        <input onChange={handleChange}
          id="password"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1 text-black"
          name="password" />
        <div>{errors.password}</div>
        <label htmlFor="password-verify" className="text-xl my-2">Verify Password</label>
        <input onChange={handleChange}
          id="verifyPassword"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1 text-black"
          name="verifyPassword" />
        <div>{errors.verifyPassword}</div>
        <button onClick={async () => {
          if (await validateUser()) {
            submit(user);
          }
        }} type="button"
          className={`text-white rounded-lg p-2 mt-5 ${verify ? ("bg-gray-500 hover:bg-gray-600") : ("bg-red-800")} `}>
          Register
        </button>
      </form>
      <div className="flex flex-col">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
