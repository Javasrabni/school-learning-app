"use client";

import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            // 1. Cek token lokal dulu (sangat cepat ±1ms)
            const accessToken = await getToken();

            if (accessToken) {
                router.replace("/dashboard");
                return;
            }

            // 2. Refresh token, dilakukan di background
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

        // *Jalankan setelah 10–80ms supaya UI tampil dulu*
        setTimeout(checkLogin, 50);
    }, [router]);

    // UI langsung tampil tanpa delay
    return (
        <div className="p-8 relative">
            <SplashOnboarding />
        </div>
    );
}
