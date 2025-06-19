"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 text-purple-500 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-center mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-purple-400 underline hover:text-purple-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
