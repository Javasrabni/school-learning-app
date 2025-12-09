"use client";

import { Capacitor } from "@capacitor/core";
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // Pastikan WebView dan plugin siap
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 250); // 250ms = aman untuk Android

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const checkLogin = async () => {
      try {
        let accessToken = null;

        // Pastikan plugin Storage siap
        if (Capacitor.isNativePlatform()) {
          accessToken = await getToken();
        } else {
          accessToken = await getToken();
        }

        if (accessToken) {
          router.replace("/dashboard");
          return;
        }

        // Gunakan absolute URL untuk Android (penting)
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${base}/api/refresh`, {
          method: "POST",
          credentials: "include",
        });

        const data = await res.json();

        if (data?.accessToken) {
          await setToken(data.accessToken);
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Login check error:", err);
      }
    };

    checkLogin();
  }, [ready]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <SplashOnboarding />
    </div>
  );
}
