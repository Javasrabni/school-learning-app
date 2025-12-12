"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import { SearchIcon, SettingsIcon, TrophyIcon } from "lucide-react";
// import Image from "next/image";
import { Swiper } from "swiper/react";
import 'swiper/css'
import Link from "next/link";
import Carousel from "../carousel/carousel";

type ProgressType = {
    materialTitle: string;
    isRead: boolean;
    score: number;
};

export default function SignedPage() {
    const { user } = useUser();

    const [progress, setProgress] = useState<ProgressType[] | null>(null);
    const [leaders, setLeaders] = useState<any[] | null>(null);

    // Fetch data (tanpa halangi UI)
    useEffect(() => {
        if (!user?._id) return;

        fetch(`/api/progress?userId=${user._id}`)
            .then((res) => res.json())
            .then((data) => setProgress(data))
            .catch(() => setProgress([]));

        fetch("/api/leaderboard")
            .then((res) => res.json())
            .then((data) => setLeaders(data.slice(0, 3)))
            .catch(() => setLeaders([]));
    }, [user]);

    const totalScore = progress?.reduce((a, b) => a + (b.score || 0), 0) ?? 0;
    const totalRead = progress?.filter((p) => p.isRead).length ?? 0;
    const level = user?.level ?? Math.floor(totalScore / 50) + 1;
    const streak = user?.streak ?? Math.min(totalRead, 30);

    // rekomendasi
    const readMaterials = new Set(progress?.filter((p) => p.isRead).map((p) => p.materialTitle));
    const allMaterials = Array.from(new Set(progress?.map((p) => p.materialTitle) ?? []));
    const recommended = allMaterials.find((m) => !readMaterials.has(m));

    const trophyColors = ['text-yellow-500', 'text-gray-400', 'text-amber-700'];

    return (
        <motion.div
            className="w-full pb-24 space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Greeting — TAMPIL LANGSUNG (tidak perlu data API) */}
            <div className="bg-[var(--accentColor)] w-full h-full flex justify-between flex-col pt-8 pb-4 px-6 gap-4">
                <div className="w-full h-full flex flex-row justify-between items-center gap-0">
                    <div>
                        <h1 className="font-bold text-lg text-white">
                            Halo, {user?.username || "User"}!
                        </h1>
                        <p className="text-sm text-gray-300">Siap belajar hari ini?</p>
                    </div>
                    <div className="w-fit h-full flex flex-row gap-4 items-center shrink-0">
                        <p className="text-xs text-gray-300">{user?.points ?? '0'} points</p>
                        <Link href={'/dashboard/profil'} className="w-10 h-10 outline-1 outline-gray-400 rounded-full">
                            <img src={user?.avatar || '/Assets/onPage/defaultProfile.png'} alt="" width={'100%'} className={` rounded-full object-cover ${!user?.avatar && 'scale-[135%]'}`} />
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="w-full h-full flex items-center gap-4 bg-gray-100 rounded-lg px-4">
                        <SearchIcon width={16} className="text-gray-400" />
                        <input type="text" className="w-full h-10 outline-none border-none text-sm" placeholder="Cari materi" />
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                        <SettingsIcon width={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* ============================
                    CARAOUSEL
                ============================ */}
            <div className="h-48 w-full pb-8 px-6 mt-[-8px]">
                <Carousel images={["/Assets/carousel/kelas7_cr.png", "/Assets/carousel/kelas8_cr.png", "/Assets/carousel/kelas9_cr.png"]}/>
            </div>

            {/* ============================
                STATS — ADA SKELETON
            ============================ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-6">
                {progress === null ? (
                    [...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-20 bg-gray-200 rounded-lg animate-pulse"
                        />
                    ))
                ) : (
                    <>
                        <StatCard color="blue" label="Total Poin" value={totalScore} />
                        <StatCard color="yellow" label="Level" value={level} />
                        <StatCard color="green" label="Materi Dibaca" value={totalRead} />
                        <StatCard color="purple" label="Streak" value={`${streak} hari`} />
                    </>
                )}
            </div>

            {/* ============================
                LEADERBOARD — ADA SKELETON
            ============================ */}
            <div className="bg-white rounded-xl p-4 shadow-sm mx-6">
                <h2 className="font-semibold text-lg mb-3">Leaderboard</h2>

                {leaders === null ? (
                    <div className="flex flex-col gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-200 rounded-md animate-pulse" />
                        ))}
                    </div>
                ) : leaders.length === 0 ? (
                    <p className="text-sm text-neutral-500">Belum ada leaderboard.</p>
                ) : (
                    <ul className="space-y-3">
                        {leaders.map((u, i) => (
                            <li
                                key={i}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <span key={i} className={`font-bold ${trophyColors[i] || 'text-blue-600'}`}>
                                        {i + 1}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src={u.avatar || "/Assets/onPage/defaultProfile.png"}
                                            className="w-full h-full object-cover scale-[135%]"
                                        />
                                    </div>
                                    <span className="font-medium">{u.username}</span>
                                </div>
                                <span className="text-sm text-gray-500">{u.points} poin</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ============================
                REKOMENDASI — ADA SKELETON
            ============================ */}
            <div className="p-4 bg-white border rounded-xl shadow-sm mx-6">
                <h3 className="font-semibold text-lg mb-2">Rekomendasi Materi</h3>

                {progress === null ? (
                    <div className="h-14 bg-gray-200 rounded-md animate-pulse" />
                ) : !recommended ? (
                    <p className="text-sm text-neutral-500">Semua materi sudah selesai.</p>
                ) : (
                    <div>
                        <p className="font-medium text-gray-800">{recommended}</p>
                        <a
                            href={`/materi/${encodeURIComponent(recommended)}`}
                            className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                            Mulai
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

//* Semua warna Tailwind yang umum */
const colorMap: Record<string, {
    bg: string;
    border: string;
    text: string;
}> = {
    slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700" },
    gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
    zinc: { bg: "bg-zinc-50", border: "border-zinc-200", text: "text-zinc-700" },
    neutral: { bg: "bg-neutral-50", border: "border-neutral-200", text: "text-neutral-700" },
    stone: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-700" },

    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
    orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
    yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
    lime: { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-700" },

    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
    teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700" },
    cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
    sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700" },

    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
    indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
    violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
    fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-700" },

    pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
    rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700" }
};


/* Komponen */
function StatCard({
    label,
    value,
    color
}: {
    label: string;
    value: number | string;
    color: string;
}) {
    const theme = colorMap[color] ?? colorMap.blue; // fallback aman

    return (
        <div className={`p-4 rounded-xl border ${theme.bg} ${theme.border}`}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold ${theme.text}`}>{value}</p>
        </div>
    );
}
