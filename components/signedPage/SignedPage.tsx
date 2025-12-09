"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";

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

    return (
        <motion.div
            className="w-full px-6 pt-6 space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Greeting — TAMPIL LANGSUNG (tidak perlu data API) */}
            <h1 className="font-bold text-2xl">
                Halo, {user?.username || "User"}!
            </h1>
            <p className="text-sm text-neutral-500">Siap belajar hari ini?</p>

            {/* ============================
                STATS — ADA SKELETON
            ============================ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h2 className="font-semibold text-lg mb-3">Leaderboard</h2>

                {leaders === null ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 rounded-md animate-pulse" />
                    ))
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
                                    <span className="font-bold text-blue-600">{i + 1}</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                        <img
                                            src={u.avatar || "/default-avatar.png"}
                                            className="w-full h-full object-cover"
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
            <div className="p-4 bg-white border rounded-xl shadow-sm">
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

/* Component agar lebih bersih */
function StatCard({ label, value, color }: any) {
    return (
        <div className={`p-4 bg-${color}-50 border border-${color}-200 rounded-xl`}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold text-${color}-700`}>{value}</p>
        </div>
    );
}
