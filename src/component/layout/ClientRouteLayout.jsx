"use client";

import { usePathname } from "next/navigation";

export default function ClientRouteLayout({ children, adminLayout: AdminLayout }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    // Login page: no sidebar
    return <>{children}</>;
  }

  // Other pages: wrap with AdminLayout (sidebar + header)
  return <AdminLayout>{children}</AdminLayout>;
}
