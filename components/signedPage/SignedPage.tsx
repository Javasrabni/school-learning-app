"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import { BellIcon, ChartSplineIcon, CornerDownRightIcon, LogOutIcon, PlayIcon, RefreshCwIcon, SearchIcon, SettingsIcon, SigmaSquareIcon, SparklesIcon, SquareFunctionIcon, TrophyIcon } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import Carousel from "../carousel/carousel";
// import ProgressPage from "@/app/dashboard/progress/page";
import Image from "next/image";
import { WaypointsIcon } from "lucide-react";
import { fadeUp } from "@/app/dashboard/progress/page";
import Leaderboard from "../Leaderboard";
import Spinner from "../loadSpinner/loadSpinner";
import OpenListMateri from "../detailMateri/detailMateri";
import { useLogout } from "../auth/logout/logout";
type Quiz = {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
};

type SubTopic = {
    title: string;
    content: string;
    quiz: Quiz[];
};

type Material = {
    _id: string;
    title: string;
    class: number;
    subTopics: SubTopic[];
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
        fetch("/api/leaderboard", {
            cache: 'force-cache'
        })
            .then((res) => res.json())
            .then((data) => setLeaders(data))
            .catch(() => setLeaders([]));
    }, []);

    const trophyColors = ['text-yellow-500', 'text-gray-500', 'text-amber-700'];

    // GET MATERI MTK
    const [materiMTK, setMateriMTK] = useState<Material[]>([])
    useEffect(() => {
        const MateriGetData = async () => {
            try {
                const res = await fetch("/api/materials", {
                    cache: "force-cache"
                });
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

    const materiPilihan = [
        { no: 1, title: "Fungsi", link: '/dashboard/material/6938bb9be7f448786e62797e' },
        { no: 2, title: "Aljabar", link: '/dashboard/material/6938bbf4699f1856aaadd80b' },
        { no: 3, title: "Geometri", link: '/dashboard/material/6938bc5377a90362e5b1470f' },
        { no: 4, title: "Bentuk Akar", link: '/dashboard/material/6938bb9be7f448786e627970' },
        { no: 5, title: "Perbandingan", link: '/dashboard/material/6938bbf4699f1856aaadd81f' },
    ]

    // REFRESH LEADERBOARD
    const [loading, setLoading] = useState(false)
    async function RefreshLeaderboard() {
        try {
            setLoading(true)
            const res = await fetch('/api/leaderboard')
            const data = await res.json()
            if (res.ok) {
                setLeaders(data)
            } else {
                setLeaders([])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // OPEN LIST MATERI BTN
    const [openListMateri, setOpenListMateri] = useState(false)
    const [getListMateriData, setGetListMateriData] = useState<Material[]>([])
    const [getIndexMateri, setIndexMateri] = useState<null | number>(null)

    function OpenNGetDataListMateri(data: any, index: number) {
        setOpenListMateri(true)
        setGetListMateriData(data)
        setIndexMateri(index)

    }

    const [onSetting, setOnSetting] = useState(false)
    const [valueOnSearch, setValueOnSearch] = useState<string | null>('')
    const [onChangeSearch, setOnChangeSearch] = useState<Material[]>([])

    // ON SEARCH MATERI
    function HandleChangeSearch(value: string | null) {
        setValueOnSearch(value);

        if (!value) {
            setOnChangeSearch([]);
            return;
        }

        const result = materiMTK.filter((i) =>
            i.title.toLowerCase().includes(value.toLowerCase())
        );

        setOnChangeSearch(result);
    }

    // LOGOUT
    const logout = useLogout()
    function Logout() {
        const confirm = window.confirm("Yakin ingin logout?")
        if(!confirm) {
            return
        } else {
            logout()
        }
    }

    return (
        <div className="flex flex-col gap-0">



            {/* Greeting — TAMPIL LANGSUNG (tidak perlu data API) */}
            <div className="bg-[var(--accentColor)] w-full h-full flex justify-between flex-col pt-8 pb-16 px-6 gap-6">

                {/* OPEN LIST MATER */}
                <div
                    className={`
    fixed inset-0
    bg-black/50
    transition-opacity duration-300 ease-in-out
    ${openListMateri ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    z-120
  `}
                >
                    {/* <div
                        className={`
      relative w-full h-full
      transition-transform duration-300 ease-out
      ${openListMateri ? 'translate-y-0' : 'translate-y-full'}
    `}
                    >
                        <div className="w-full h-72 relative">
                            <div className="relative z-10 h-[80%] text-white p-6 flex items-center justify-center">
                                <h1 className="text-lg font-bold font-[urbanist]">
                                    Kelas {getListMateriData[0]?.class}
                                </h1>
                            </div>

                            <Image
                                src={
                                    getListMateriData[0]?.class === 7
                                        ? '/Assets/card/card_02.png'
                                        : getListMateriData[0]?.class === 8
                                            ? '/Assets/card/card03.png'
                                            : '/Assets/card/card04.png'
                                }
                                alt=""
                                fill
                                className="select-none object-cover blur-[3px] scale-[105%] brightness-40"
                            />
                        </div>
                    </div> */}
                </div>


                <OpenListMateri onOpen={openListMateri} setOnOpen={setOpenListMateri} onData={getListMateriData} indexMateri={getIndexMateri} />

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
                        {/* <BellIcon width={18} className="text-white" /> */}
                        <Link href={'/dashboard/profil'} className="w-8 h-8 outline-0 outline-gray-400 rounded-full">
                            <img src={user?.avatar || '/Assets/onPage/defaultProfile.png'} alt="" width={'100%'} className={` rounded-full object-cover ${!user?.avatar && 'scale-[135%]'}`} />
                        </Link>
                    </div>
                </div>

                {/* SEARCH INPUT N SETTING */}
                <div className="flex items-center justify-between gap-3 relative">
                    {onChangeSearch.length > 0 && (
                        <div
                            className="
      absolute left-0 top-full mt-2 w-full
      bg-white rounded-xl shadow-lg
      border border-gray-200
      z-[200]
      max-h-64 overflow-y-auto
    "
                        >
                            {onChangeSearch.map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/dashboard/material/${item._id}`}
                                    className="
          block px-4 py-3
          text-sm font-[poppins]
          text-gray-700
          transition-colors
          hover:bg-gray-100
          active:bg-gray-200
        "
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="w-full h-full flex items-center gap-4 bg-white rounded-lg px-4">
                        <SearchIcon width={16} className="text-gray-500" />
                        <input type="text" className="w-full h-10 outline-none border-none text-xs" placeholder="Cari materi" value={valueOnSearch || ''} onChange={(e) => HandleChangeSearch(e.target.value)} />

                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white" onClick={() => setOnSetting((prev) => !prev)}>
                        <SettingsIcon width={16} className="text-gray-500" />
                    </div>
                    {onSetting && (
                        <div className="absolute z-200 bottom-[-90%] outline-1 outline-blue-200 right-0 bg-white flex items-center justify-between gap-2 px-4 py-[2px] rounded-md" onClick={Logout}>
                            <LogOutIcon width={16} color="tomato" />
                            <p className="text-xs">Logout</p>
                        </div>
                    )}
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

                    <motion.div {...fadeUp} className="px-6 flex flex-col gap-1">
                        <span className="flex flex-row gap-2 items-center">
                            <SigmaSquareIcon width={16} />
                            <h1 className="text-base font-semibold font-[poppins]"> Mulai dari dasar</h1>
                        </span>
                        <p className="text-xs text-gray-500">Sebagai pondasi awal pemahaman matematika tingkat lanjut.</p>
                    </motion.div>
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
                                            <span className="relative z-10 w-2 h-2 bg-[var(--accentColor)] rounded-full" />
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
                                        <Link href={`/dashboard/material/${i._id}`} className="text-xs font-[urbanist] bg-[var(--accentColor)] px-4 py-[2px] rounded-full text-white font-semibold mt-2">
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
                <div className="w-full space-y-6 bg-white py-6">
                    {/* Title */}
                    <motion.div {...fadeUp} className="flex flex-col gap-1 px-6">
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
                        <div className="flex flex-row gap-4 w-full h-full px-6">
                            {[7, 8, 9].map((cls, cidx) => {
                                const filtered = materiMTK.filter((i) => i.class === cls)
                                const totalSubtopics = filtered.reduce(
                                    (t, m) => t + (m.subTopics?.length || 0),
                                    0
                                );

                                const totalQuiz = filtered.reduce(
                                    (t, m) =>
                                        t +
                                        m.subTopics.reduce(
                                            (st, s) => st + (s.quiz?.length || 0),
                                            0
                                        ),
                                    0
                                );
                                return (
                                    <div
                                        key={cidx}
                                        className="w-45.5 h-58.5 bg-stone-100 rounded-xl shrink-0 relative overflow-hidden "
                                    >
                                        {/* Background Image */}
                                        <Image
                                            src={cls === 7 ? "/Assets/card/card_02.png" : cls === 8 ? "/Assets/card/card03.png" : "/Assets/card/card04.png"}
                                            alt=""
                                            fill
                                            className="object-cover rounded-xl z-8 scale-[100%]"
                                        />

                                        {/* Overlay supaya teks kebaca */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-9" />

                                        {/* Content */}
                                        <div className="flex flex-col justify-between items-end w-full h-full top-0 right-0 relative z-10 p-4">
                                            <div className="flex flex-col gap-[-4px]">
                                                <h1 className="font-semibold text-base font-[poppins] text-white text-right">
                                                    Kelas {cls}
                                                </h1>

                                                <p className="text-xs text-white/80 text-right font-bold font-[urbanist]">
                                                    {filtered.length} Materi · {totalSubtopics} Submateri
                                                </p>
                                            </div>

                                            <div className="w-full flex flex-row justify-between items-center">
                                                <p className="text-xs text-white/80 text-left font-bold font-[urbanist]">Total <br />{totalQuiz} Soal</p>
                                                <button
                                                    onClick={() => OpenNGetDataListMateri(filtered, cls)}
                                                    className="w-fit px-4 py-1 bg-[var(--accentColor)] rounded-full shadow-md hover:bg-blue-600 transition"
                                                >
                                                    <p className="text-white font-semibold text-xs font-[urbanist]">
                                                        Mulai Belajar
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                )
                            })}
                            <div className="w-2 shrink-0" />
                        </div>
                    </div>

                </div>

                <div className="w-full h-full flex flex-col gap-6 p-6 bg-white">
                    <motion.div {...fadeUp} className="flex flex-col gap-1">
                        <span className="flex flex-row gap-2 items-center">
                            <SparklesIcon width={16} />
                            <h1 className="text-base font-semibold font-[poppins]">Materi Pilihan</h1>
                        </span>
                        <p className="text-xs text-stone-500">
                            Materi yang seru untuk kamu pelajari!
                        </p>
                    </motion.div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {materiPilihan.map((i) =>
                            <Link key={i.no} href={i.link} className="w-fit bg-stone-100 px-6 py-2 rounded-md outline-1 outline-blue-200">
                                <h1 className="text-xs font-semibold font-[urbanist]">{i.title}</h1>
                            </Link>
                        )}
                    </div>
                </div>


                {/* LEADERBOARD — ADA SKELETON */}
                <div className="bg-white p-6 h-full w-full space-y-6">
                    <motion.div {...fadeUp} className="flex flex-col gap-1 pb-4">
                        <div className="flex flex-row items-center gap-4 justify-between">
                            <span className="flex flex-row gap-2 items-center">
                                <TrophyIcon width={16} />
                                <h1 className="text-base font-semibold font-[poppins]">Leaderboard</h1>
                            </span>
                            <button className="flex space-x-2 items-center  rounded-md px-2 outline-1 outline-gray-200 cursor-pointer" onClick={RefreshLeaderboard}>
                                <RefreshCwIcon width={14} />
                                <p className="text-xs font-semibold font-[urbanist]">Refresh</p>
                            </button>
                        </div>
                        <p className="text-xs text-stone-500">
                            *Dapatkan poin dengan mengerjakan soal pada materi pembelajaran.
                        </p>
                    </motion.div>


                    {leaders === null ? (
                        <div className="flex flex-col gap-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded-md animate-pulse" />
                            ))}
                        </div>
                    ) : leaders.length === 0 ? (
                        <p className="text-sm text-neutral-500">Belum ada leaderboard.</p>
                    ) : (
                        <>
                            {loading ? (
                                <div className="w-full h-[320px]">
                                    <Spinner withBg={false} />
                                </div>
                            ) : (

                                <div className="w-full flex flex-col space-y-6">
                                    <div className="space-x-2 flex flex-row w-full h-full items-end">
                                        {[1, 0, 2].map((cls) => {
                                            const render = leaders[cls]
                                            return (
                                                <div key={cls} className="flex flex-col w-full space-y-4 items-center justify-center">
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
                        </>

                    )}
                </div>

            </  div>
        </div >
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
