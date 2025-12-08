'use client'
import { useEffect, useState } from "react";
import { getToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import SignedPage from "@/components/signedPage/SignedPage";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      let token = await getToken();

      if (!token) {
        const res = await fetch("/api/refresh", { method: "POST", credentials: "include" });
        const data = await res.json();
        if (res.ok && data.accessToken) {
          token = data.accessToken;
        }
      }

      if (!token) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  if (loading) return null;

  return <SignedPage />;
}
