"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, go directly to dashboard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin === "true") {
        router.replace("/");
      }
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: hardcoded credentials – replace with real auth later
    if (email === "admin@site.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-lg">
        <h1 className="mb-2 text-2xl font-semibold text-zinc-900">
          Admin Login
        </h1>
        <p className="mb-6 text-sm text-zinc-600">
          Sign in to access the e‑commerce admin dashboard and CMS.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@site.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}
