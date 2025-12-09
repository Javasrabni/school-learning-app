"use client";

import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Biar UI langsung muncul, lalu token check dilakukan setelah mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Background token check
  useEffect(() => {
    if (!mounted) return;

    const checkLogin = async () => {
      const accessToken = await getToken();

      if (accessToken) {
        router.replace("/dashboard");
        return;
      }

      try {
        const res = await fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (data?.accessToken) {
          await setToken(data.accessToken);
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    };

    // cek login tanpa delay (sekarang UI sudah muncul)
    checkLogin();
  }, [mounted, router]);

  return (
    <div className="p-8 relative">
      <SplashOnboarding />
    </div>
  );
}
