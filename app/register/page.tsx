"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    
    // const data = await Response.json();
    // console.log(data)
    redirect('/dashboard')
    // alert(data.message);
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center">
          <button className="bg-black text-white p-2 rounded border w-50 hover:bg-white hover:text-black">Register</button>
        </div>
      </form>
    </div>
  );
}
