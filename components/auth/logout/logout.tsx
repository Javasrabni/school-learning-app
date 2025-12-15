"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      // bersihkan data client
      localStorage.clear();
      sessionStorage.clear();

      // redirect & refresh auth state
      window.location.reload()
    } catch (err) {
      console.error("Logout gagal", err);
    }
  };

  return logout;
}