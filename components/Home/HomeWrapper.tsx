"use client"
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, setToken } from "@/utils/authStorage";

export default function HomeWrapper() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const accessToken = await getToken();

            if (accessToken) {
                // Redirect langsung jika token masih ada
                router.replace("/dashboard");
                return;
            }

            // Token tidak ada, coba refresh
            const res = await fetch("/api/refresh", {
                method: "POST",
                credentials: "include", // ambil refresh_token dari cookie
            });

            const data = await res.json();

            if (data.accessToken) {
                await setToken(data.accessToken);  // simpan akses baru
                router.replace("/dashboard");
                return;
            }

            // Tidak ada token dan refresh gagal → tampilkan HomeWrapper
            setLoading(false);
        };

        checkLogin();
    }, []);

    if (loading) return <p>loading...</p>; // tampilan loading sementara
    return (
        <div className="p-8 relative">
            <SplashOnboarding />
        </div>
    );
}
