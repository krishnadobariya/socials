"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/Action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded p-8 w-[350px] shadow-[0_0_3px_rgba(0,0,0,0.2)] border border-[#393939]">
        {/* <img
          src="/Instagram_logo.svg.png"
          className="w-[200px] mx-auto mb-4 invert"
        /> */}
        <h1 className="text-white text-3xl font-[cursive] uppercase text-center mb-4">
          Socials
        </h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
          />
        </div>
        <a
          onClick={handleLogin}
          href="/home"
          className="w-full uppercase block text-center py-2 mt-7 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </a>
        <div className="mt-10 text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="!text-blue-500">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
