"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User2Icon, TrophyIcon, FlameIcon, CheckCircleIcon } from "lucide-react";
import { useUser } from "@/context/userDataCookie";
import PerformanceChart from "@/components/PerformanceChart";
import QuizHistory from "@/components/QuizHistory";
import Leaderboard from "@/components/Leaderboard";
import AvatarUpload from "@/components/AvatarUpload";
import Image from "next/image";

type ProgressType = {
  materialTitle: string;
  subTopicIndex: number;
  isRead: boolean;
  score: number;
  createdAt?: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function ProfileClient() {
  const { user, loading: userLoading, refreshUser } = useUser();
  const [progress, setProgress] = useState<ProgressType[] | null>(null);

  useEffect(() => {
    if (!user?._id) {
      setProgress([]);
      return;
    }

    fetch(`/api/progress?userId=${user._id}`)
      .then((r) => r.json())
      .then((data) => setProgress(data || []))
      .catch(() => setProgress([]));
  }, [user]);

  const totalScore = progress?.reduce((acc, p) => acc + (p.score || 0), 0) ?? 0;
  const totalRead = progress?.filter((p) => p.isRead).length ?? 0;

  const level = Math.floor(totalScore / 50) + 1;
  const nextLevelProgress = totalScore % 50;
  const streak = Math.min(totalRead, 30);

  const totalCorrect = progress?.filter((p) => p.score >= 10).length ?? 0;
  const totalWrong = progress?.filter((p) => p.score === 0 && p.isRead).length ?? 0;

  const materials =
    progress ? Array.from(new Set(progress.map((p) => p.materialTitle))) : [];

  const badges = [
    ...(totalRead >= 10 ? ["Materi Novice"] : []),
    ...(totalRead >= 30 ? ["Materi Expert"] : []),
    ...(totalScore >= 100 ? ["Quiz Master"] : [])
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden" >
      <div className="max-w-4xl mx-auto space-y-6" >

        {/* HEADER */}
        <div className="flex flex-col items-center justify-between gap-4 relative" >
          <div className="absolute  w-full h-full top-0 left-0 flex items-center justify-center z-100">
            <p className="text-white font-bold font-[urbanist]">Profil</p>
          </div>
          <div className="w-full h-full absolute z-50 bg-[var(--accentColor)] opacity-50"></div>
          <div className="w-full h-50 relative">
            <Image
              src={user?.avatar || "/Assets/onPage/defaultProfile.png"}
              alt=""
              fill
              className="object-cover position-center brightness-50 blur-[4px] scale-[110%]"
            />
          </div>


        </div>


        <div className="z-60 flex flex-col space-y-6 relative top-[-50px] bg-gray-50 rounded-t-4xl justify-between gap-4 py-6 bg-white">
          <div className="flex flex-row items-center justify-between gap-4 px-6">
            <div className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                {userLoading ? (
                  <div className="w-full h-full bg-gray-300 animate-pulse" />
                ) : (
                  <img
                    src={user?.avatar || "/Assets/onPage/defaultProfile.png"}
                    className="w-full h-full object-cover scale-[135%]"
                    alt=""
                  />
                )}
              </div>

              <div>
                {userLoading ? (
                  <>
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </>
                ) : (
                  <div className="flex flex-col gap-[2px]">
                    <h2 className="text-base font-semibold font-[poppins]">{user?.username}</h2>
                    <p className="text-xs text-gray-500 font-[poppins]">
                      Level {user?.level ?? level} • {user?.points ?? totalScore} poin
                    </p>
                  </div>
                )}
              </div>
            </div>
            {!userLoading && <AvatarUpload onUploaded={refreshUser} />}
          </div>

          {/* CHART */}
          <div className="bg-white w-full flex flex-col gap-4 px-6" >
            <h3 className="text-base font-semibold ">Statistik Kamu</h3>

            {progress === null ? (
              <div className="h-40 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <div className="relative left-[-20px]">
                <PerformanceChart data={progress} />
              </div>
            )}
          </div>


          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6" >
            {[
              {
                label: "Total Poin",
                value: user?.points ?? totalScore,
                icon: <CheckCircleIcon width={16} className="text-stone-400" />,
                color: "blue"
              },
              {
                label: "Materi Dibaca",
                value: totalRead,
                icon: <FlameIcon width={16} className="text-stone-400" />,
                color: "green"
              },
              {
                label: "Level",
                value: user?.level ?? level,
                icon: <User2Icon width={16} className="text-stone-400" />,
                color: "yellow"
              },
              {
                label: "Streak",
                value: user?.streak ?? streak,
                icon: <TrophyIcon width={16} className="text-stone-400" />,
                color: "purple"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-4 bg-stone-100 rounded-xl `}

              >
                {progress === null ? (
                  <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{item.label}</p>
                      <p className={`text-base font-bold text-[var(--accentColor)]`}>
                        {item.value}
                      </p>
                    </div>
                    {item.icon}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="w-ful h-2 bg-stone-100"></div>

          {/* SUMMARY */}
          <div className="bg-white px-6"  >
            <h4 className="text-base font-semibold mb-2">Ringkasan</h4>

            {progress === null ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
            ) : (
              <>
                <SummaryRow label="Jawaban Benar" value={totalCorrect} color="" />
                <SummaryRow label="Jawaban Salah" value={totalWrong} color="" />
                <SummaryRow label="Materi Dibaca" value={materials.length} />

                {/* Progress bar */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-2">Progress ke Level Berikutnya</p>
                  <div className="w-full bg-gray-100 h-1 rounded-full">
                    <div
                      className="h-1 bg-[var(--accentColor)] rounded-full"
                      style={{ width: `${(nextLevelProgress / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6 ">
                  <h5 className="text-sm font-semibold">Badges</h5>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {badges.length ? (
                      badges.map((b, i) => (
                        <span key={i} className="px-2 py-1 bg-yellow-200 font-[urbanist] font-bold rounded text-xs">
                          {b}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">Belum ada badges</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-ful h-2 bg-stone-100"></div>


          {/* QUIZ HISTORY */}
          <div className="bg-white px-6" >
            <h4 className="font-semibold mb-2 font-[poppins] text-base">Riwayat Quiz</h4>
            {progress === null ? (
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <QuizHistory userId={user?._id} />
            )}
          </div>

          <div className="w-ful h-2 bg-stone-100"></div>


          {/* MATERI */}
          <div className="bg-white px-6" >
            <h4 className="font-semibold font-[poppins] text-base mb-2">Materi yang sudah dibaca</h4>

            {progress === null ? (
              <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
            ) : materials.length === 0 ? (
              <p className="text-xs text-gray-500">Belum membaca materi.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {materials.map((m, idx) => {
                  const count = progress.filter(
                    (p) => p.materialTitle === m && p.isRead
                  ).length;

                  return (
                    <li key={idx} className="p-3 rounded bg-gray-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">{m}</span>
                        <span className="text-xs font-[urbanist] font-bold text-gray-500">{count} bagian</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>







        {/* LEADERBOARD */}
        {/* <div className="bg-white p-4 rounded-xl shadow" >
          <h4 className="font-semibold mb-3">Leaderboard</h4>
          <Leaderboard />
        </div> */}


      </div>

    </div>
  );
}

function SummaryRow({
  label,
  value,
  color
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const colorClass: Record<string, string> = {
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-700",
    yellow: "text-yellow-700",
    orange: "text-orange-700",
    purple: "text-purple-700",
  };

  return (

    <div className="flex items-center pb-[2px] justify-between">
      <span className="text-xs font-[poppins] text-gray-500">{label}</span>
      <span className={`font-bold text-xs ${color ? colorClass[color] : ""}`}>
        {value}
      </span>
    </div>
  );
}
