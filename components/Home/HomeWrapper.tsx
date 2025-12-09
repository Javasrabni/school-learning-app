'use client'
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";

export default function HomeWrapper() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      let token = await getToken();

      if (!token) {
        // coba refresh token dari cookie httpOnly
        const res = await fetch("/api/refresh", { method: "POST", credentials: "include" });
        const data = await res.json();
        if (res.ok && data.accessToken) {
          token = data.accessToken;
          if(token) await setToken(token);
        }
      }

      if (token) router.replace("/dashboard");
      else setLoading(false);
    };

    checkLogin();
  }, [router]);

  if (loading) return <p>Load..</p>;

  return (
    <div className="p-8 relative">
      <SplashOnboarding />
    </div>
  );
}
