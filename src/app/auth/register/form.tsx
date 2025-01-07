"use client";
import { isEmailTakenAlready, isUsernameTakenAlready } from "@/actions/auth";
import { useState } from "react";

interface Props {
  submit(user: { username: string; password: string; email: string }): void;
  loading: boolean;
  setLoading(loading: boolean): void;
}

export default function Form({ submit, loading, setLoading }: Props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    verifyPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    verifyPassword: "",
  });

  const validateUser = async () => {
    let valid = true;
    const newErrors = { ...errors };

    const isUsernameTaken = await isUsernameTakenAlready(user.username);

    if (isUsernameTaken) {
      newErrors.username = "Username already Exists";
      valid = false;
    } else if (user.username.includes("@") || /\s/.test(user.username)) {
      newErrors.username =
        "Username is invalid (cannot contain special characters)";
      valid = false;
    } else if (user.username.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    } else newErrors.username = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailTaken = await isEmailTakenAlready(user.email);

    if (isEmailTaken) {
      newErrors.email = "Email already Taken";
      valid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else newErrors.email = "";

    // Validate password
    if (user.password.length < 2) {
      newErrors.password = "Password must be at least 2 characters";
      valid = false;
    } else if (/\s/.test(user.password)) {
      newErrors.password = "Password must not have spaces";
      valid = false;
    } else if (user.verifyPassword !== user.password) {
      newErrors.verifyPassword = "Passwords do not match";
      valid = false;
    } else newErrors.verifyPassword = "";

    setErrors(newErrors);
    return valid;
  };

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <form className="flex flex-col pt-8">
      <label htmlFor="username" className="text-xl my-2">
        Username
      </label>
      <input
        onChange={handleChange}
        id="username"
        type="username"
        autoComplete="on"
        className="rounded-lg p-1 text-black"
        name="username"
      />
      <div>{errors.username}</div>
      <label htmlFor="email" className="text-xl my-2">
        Email
      </label>
      <input
        onChange={handleChange}
        id="email"
        type="email"
        autoComplete="on"
        className="rounded-lg p-1 text-black"
        name="email"
      />
      <div>{errors.email}</div>
      <label htmlFor="password" className="text-xl my-2">
        Password
      </label>
      <input
        onChange={handleChange}
        id="password"
        type="password"
        autoComplete="off"
        className="rounded-lg p-1 text-black"
        name="password"
      />
      <div>{errors.password}</div>
      <label htmlFor="password-verify" className="text-xl my-2">
        Verify Password
      </label>
      <input
        onChange={handleChange}
        id="verifyPassword"
        type="password"
        autoComplete="off"
        className="rounded-lg p-1 text-black"
        name="verifyPassword"
      />
      <div>{errors.verifyPassword}</div>
      <button
        onClick={async () => {
          setLoading(true);
          if (await validateUser()) {
            submit(user);
          }
          setLoading(false);
        }}
        type="button"
        disabled={loading}
        className={`text-white rounded-lg p-2 mt-5
          ${
            loading
              ? "cursor-not-allowed bg-gray-500"
              : "bg-red-800 hover:bg-red-900"
          }`}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}
