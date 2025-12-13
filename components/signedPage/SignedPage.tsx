"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import { BellIcon, ChartSplineIcon, CornerDownRightIcon, PlayIcon, SearchIcon, SettingsIcon, SigmaSquareIcon, SquareFunctionIcon, TrophyIcon } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import Carousel from "../carousel/carousel";
// import ProgressPage from "@/app/dashboard/progress/page";
import Image from "next/image";
import { WaypointsIcon } from "lucide-react";
import { fadeUp } from "@/app/dashboard/progress/page";
import Leaderboard from "../Leaderboard";

type Material = {
    _id: string;
    title: string;
    class: number;
    subTopics: { title: string }[];
};

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
            .then((data) => setLeaders(data))
            .catch(() => setLeaders([]));
    }, [user]);

    const totalScore = progress?.reduce((a, b) => a + (b.score || 0), 0) ?? 0;
    const totalRead = progress?.filter((p) => p.isRead).length ?? 0;
    const level = user?.level ?? Math.floor(totalScore / 50) + 1;
    const streak = user?.streak ?? Math.min(totalRead, 30);



    const trophyColors = ['text-yellow-500', 'text-gray-500', 'text-amber-700'];

    // GET MATERI MTK
    const [materiMTK, setMateriMTK] = useState<Material[]>([])
    useEffect(() => {
        const MateriGetData = async () => {
            try {
                const res = await fetch("/api/materials");
                const data = await res.json();
                if (res.ok) {
                    setMateriMTK(data)
                    console.log(data, "DARI MATERI MTK")
                }
            } catch (error) {
                console.error(error)
            }
        };
        MateriGetData()
    }, [])

    return (
        <div className="flex flex-col gap-0">
            {/* Greeting — TAMPIL LANGSUNG (tidak perlu data API) */}
            <div className="bg-[var(--accentColor)] w-full h-full flex justify-between flex-col pt-8 pb-16 px-6 gap-6">

                {/* GREETING N PHOTO PROFILE */}
                <div className="w-full h-full flex flex-row justify-between items-center gap-0">
                    <div>
                        <h1 className="font-bold font-[poppins] text-base text-white">
                            Halo, {user?.username || "User"}!
                        </h1>
                        <p className="text-xs  text-gray-300  font-[poppins]">Siap belajar matematika hari ini?</p>
                    </div>
                    <div className="w-fit h-full flex flex-row gap-4 items-center shrink-0">
                        {/* <p className="text-xs text-gray-300">{user?.grade}</p> */}
                        <BellIcon width={18} className="text-white" />
                        <Link href={'/dashboard/profil'} className="w-8 h-8 outline-0 outline-gray-400 rounded-full">
                            <img src={user?.avatar || '/Assets/onPage/defaultProfile.png'} alt="" width={'100%'} className={` rounded-full object-cover ${!user?.avatar && 'scale-[135%]'}`} />
                        </Link>
                    </div>
                </div>

                {/* SEARCH INPUT N SETTING */}
                <div className="flex items-center justify-between gap-3">
                    <div className="w-full h-full flex items-center gap-4 bg-white rounded-lg px-4">
                        <SearchIcon width={16} className="text-gray-500" />
                        <input type="text" className="w-full h-10 outline-none border-none text-xs" placeholder="Cari materi" />
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                        <SettingsIcon width={16} className="text-gray-500" />
                    </div>
                </div>

            </div>

            {/* BODY SECTION */}
            <div className="w-full pb-4 space-y-2 bg-stone-100 rounded-t-4xl relative top-[-2.5rem]" >



                {/* <div className={`bg-gray-100 px-6 py-2 shrink-0 rounded-full border-1 ${idx <= 1 ? ' border-blue-200' : idx === 2 ? 'border-orange-200' : 'border-red-200'}`}>
                                <p className="text-xs font-[urbanist] font-bold">{i.title}</p>
                            </div> */}

                {/* MULAI DARI DASAR (SECTION) */}
                <div className="flex flex-col pb-6 gap-4 bg-white rounded-t-4xl">
                    {/* CARAOUSEL (SECTION) */}
                    <div className="h-48 w-full pb-8 px-6 mt-6 bg-white relative">

                        <div className="absolute bottom-11 left-0 z-30 text-white flex items-center justify-around w-full">
                            <SquareFunctionIcon width={16} className="opacity-50" />
                            <p className={'text-xs font-bold font-[urbanist]'}>Mathemagic</p>
                            <ChartSplineIcon width={16} className="opacity-50" />
                        </div>

                        {/* <div className="absolute bottom-12 left-[50%] translate-x-[-50%] z-30 text-white bg-white px-4 py-[2px] rounded-full">
                            <span className="flex flex-row gap-2 items-center">
                                <PlayIcon width={12} fill="#2b7fff" className="text-blue-500" />
                                <p className="text-xs text-black font-[inter]">Mulai</p>
                            </span>

                        </div> */}
                        <Carousel images={["/Assets/carousel/kelas7_cr.png", "/Assets/carousel/kelas8_cr.png", "/Assets/carousel/kelas9_cr.png"]} />
                    </div>

                    <div className="px-6 flex flex-col gap-1">
                        <span className="flex flex-row gap-2 items-center">
                            <SigmaSquareIcon width={16} />
                            <h1 className="text-base font-semibold font-[poppins]"> Mulai dari dasar</h1>
                        </span>
                        <p className="text-xs text-gray-500">Sebagai pondasi awal pemahaman matematika tingkat lanjut.</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 overflow-x-auto px-6 no-scrollbar">
                        <div className="relative flex items-start justify-between mt-3  mb-6 w-[50%] translate-x-[-35px]">
                            {materiMTK
                                .filter(i => i.class === 7)
                                .slice(0, 4)
                                .map((i, idx, arr) => (
                                    <div key={idx} className="flex flex-col items-center w-full relative shrink-0">

                                        {/* Garis */}
                                        {idx !== arr.length - 1 && (
                                            <div className="absolute top-[2.7px] left-1/2 w-full h-[2px] bg-gray-300" />
                                        )}

                                        {/* Dot */}
                                        <span className="relative flex items-center justify-center">
                                            <span
                                                className="absolute inline-flex h-4 w-4 rounded-full 
                     bg-blue-400/30 ease-in-out animate-ping"
                                                style={{
                                                    animationDelay: `${idx * 0.6}s`,
                                                    animationDuration: `${arr.length * 0.5}s`,
                                                }}
                                            />
                                            <span className="relative z-10 w-2 h-2 bg-blue-500 rounded-full" />
                                        </span>

                                        {/* Konten */}
                                        <div className="mt-3 text-center w-full space-y-[2px]">
                                            <span>

                                                <p className="text-xs font-bold font-[urbanist]">{i.title}</p>
                                            </span>
                                            <p className="text-xs font-[inter] text-gray-500 ">
                                                {i.subTopics.length} Materi
                                            </p>
                                        </div>
                                        <Link href={'/'} className="text-xs font-[urbanist] bg-blue-500 px-4 py-[2px] rounded-full text-white font-semibold mt-2">
                                            <span className="flex items-center space-x-2 ">
                                                <CornerDownRightIcon width={12} />
                                                <p>Buka</p>
                                            </span>

                                        </Link>
                                    </div>
                                ))}
                        </div>




                    </div>
                </div>

                {/* LIST MATERI KELAS 7-9 (SECTION) */}
                <div className="w-full px-6 space-y-6 bg-white py-6">
                    {/* Title */}
                    <motion.div {...fadeUp} className="flex flex-col gap-1">
                        <span className="flex flex-row gap-2 items-center">
                            <WaypointsIcon width={16} />
                            <h1 className="text-base font-semibold font-[poppins]">Materi Belajar</h1>
                        </span>
                        <p className="text-xs text-stone-500">
                            Mulai belajar matematika sesuai dengan tingkatan kamu, mulai dari kelas 7 - 9.
                        </p>
                    </motion.div>

                    {/* <div
                        className="h-20 bg-gray-200 rounded-lg animate-pulse"
                    /> */}

                    {/* LIST KELAS */}
                    <div className="w-full h-full overflow-x-auto">
                        <div className="flex flex-row gap-4 w-full h-full">
                            {[7, 8, 9].map((cls, cidx) => {
                                const filtered = materiMTK.filter((i) => i.class === cls)
                                return (
                                    <div
                                        key={cidx}
                                        className="w-45.5 h-58.5 bg-stone-100 rounded-xl shrink-0 relative overflow-hidden"
                                    >
                                        {/* Background Image */}
                                        <Image
                                            src="/Assets/card/card2.png"
                                            alt=""
                                            fill
                                            className="object-cover rounded-xl z-8"
                                        />

                                        {/* Overlay supaya teks kebaca */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-9" />

                                        {/* Content */}
                                        <div className="flex flex-col justify-between items-end w-full h-full top-0 right-0 relative z-10 p-4">
                                            <div className="items-end w-full flex flex-col">
                                                <h1 className="font-semibold text-base font-[poppins] text-white">
                                                    Kelas {cls}
                                                </h1>

                                                <p className="text-xs text-white/80 text-right font-bold font-[urbanist] mt-1">
                                                    Silabus & Materi Terstruktur
                                                </p>
                                            </div>

                                            <Link
                                                href="/"
                                                className="w-fit px-4 py-1 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition"
                                            >
                                                <p className="text-white font-semibold text-xs font-[urbanist]">
                                                    Mulai Belajar
                                                </p>
                                            </Link>
                                        </div>
                                    </div>


                                )
                            })}

                        </div>
                    </div>

                </div>


                {/* LEADERBOARD — ADA SKELETON */}
                <div className="bg-white p-6 h-full w-full space-y-6">
                    <span className="flex space-x-2 items-center">
                        <TrophyIcon width={16} />
                        <h2 className="font-semibold text-sm">Leaderboard</h2>
                    </span>

                    {leaders === null ? (
                        <div className="flex flex-col gap-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded-md animate-pulse" />
                            ))}
                        </div>
                    ) : leaders.length === 0 ? (
                        <p className="text-sm text-neutral-500">Belum ada leaderboard.</p>
                    ) : (
                        <div className="w-full flex flex-col space-y-6">
                            <div className="space-x-2 flex flex-row w-full h-full items-end">
                                {[1, 0, 2].map((cls) => {
                                    const render = leaders[cls]
                                    return (
                                        <div className="flex flex-col w-full space-y-4 items-center justify-center">
                                            <div className="flex items-center justify-center flex-col gap-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                    <img
                                                        src={render.avatar || "/Assets/onPage/defaultProfile.png"}
                                                        className="w-full h-full object-cover scale-[135%]"
                                                    />
                                                </div>
                                                <span className="gap-[2px] flex flex-col items-center justify-center">
                                                    <h1 className="text-center font-medium text-sm font-[poppins]">{render.username}</h1>
                                                    <p className="text-xs text-gray-500 font-semibold font-[urbanist]">{render.points} poin</p>
                                                </span>
                                            </div>
                                            <div key={cls} className={`w-full flex flex-col items-center justify-start bg-gray-100 p-4 rounded-t-lg ${cls === 0 ? "h-39" : cls === 1 ? 'h-26' : 'h-13'}`}>
                                                <span className={`font-bold ${trophyColors[cls] || 'text-blue-600'}`}>
                                                    {cls + 1}
                                                </span>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* <p className="text-sm font-[poppins]">Semua pengguna</p> */}
                                {leaders.slice(3).map((i, idx) =>
                                    <div key={idx} className="flex flex-row w-full space-x-4 items-center">
                                        <p className="text-sm font-bold">{idx + 4}</p>
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                            <img
                                                src={i.avatar || "/Assets/onPage/defaultProfile.png"}
                                                className="w-full h-full object-cover scale-[135%]"
                                            />
                                        </div>
                                        <h1 className="text-center text-xs font-[poppins]">{i.username}</h1>
                                        <p className="text-xs text-gray-500 font-semibold font-[urbanist]">{i.points} poin</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </  div>
        </div>
    );
}

//* Semua warna Tailwind yang umum */
// const colorMap: Record<string, {
//     bg: string;
//     border: string;
//     text: string;
// }> = {
//     slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700" },
//     gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
//     zinc: { bg: "bg-zinc-50", border: "border-zinc-200", text: "text-zinc-700" },
//     neutral: { bg: "bg-neutral-50", border: "border-neutral-200", text: "text-neutral-700" },
//     stone: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-700" },

//     red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
//     orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
//     amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
//     yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
//     lime: { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-700" },

//     green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
//     emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
//     teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700" },
//     cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
//     sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700" },

//     blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
//     indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
//     violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700" },
//     purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
//     fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-700" },

//     pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
//     rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700" }
// };


// /* Komponen */
// function StatCard({
//     label,
//     value,
//     color
// }: {
//     label: string;
//     value: number | string;
//     color: string;
// }) {
//     const theme = colorMap[color] ?? colorMap.blue; // fallback aman

//     return (
//         <div className={`p-4 rounded-xl border ${theme.bg} ${theme.border}`}>
//             <p className="text-xs text-gray-500">{label}</p>
//             <p className={`text-xl font-bold ${theme.text}`}>{value}</p>
//         </div>
//     );
// }
