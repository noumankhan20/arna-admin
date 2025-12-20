"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRequireAdmin() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.replace("/login");
    }
  }, [router]);
}
