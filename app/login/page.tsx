"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e:FormEvent) {
    e.preventDefault();
    


    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (!res?.error) {
      console.log("login",res)
      router.push("/dashboard");
      
    } else {
      console.log(res)
      alert("Login failed");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link href="/register" className="text-sm text-blue-500 hover:underline">
          Don&apos;t have an account? Register
        </Link>

        <div className="flex justify-center">
          <button className="bg-black text-white border p-2 w-50  rounded hover:bg-white hover:text-black">Login</button>
        </div>

      </form>
    </div>
  );
}
