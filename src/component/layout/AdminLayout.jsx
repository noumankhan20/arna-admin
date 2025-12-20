"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin"); // remove login flag
    }
    router.push("/login"); // go back to login page
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans">
        {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-50 p-4 hidden md:flex flex-col gap-4">
        <div className="text-lg font-semibold mb-4">Arna Analytics</div>
        <nav className="flex flex-col gap-2 text-sm">
          <a href="/" className="rounded px-3 py-2 hover:bg-zinc-800">
            Dashboard
          </a>
          <a href="/cms" className="rounded px-3 py-2 hover:bg-zinc-800">
            CMS (Hero & Images)
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-100"
          >
            Logout
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}
