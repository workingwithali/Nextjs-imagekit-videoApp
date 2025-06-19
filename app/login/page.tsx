"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 text-purple-500 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-purple-400 underline hover:text-purple-300 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
