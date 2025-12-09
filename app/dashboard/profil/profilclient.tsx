"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User2Icon, TrophyIcon, FlameIcon, CheckCircleIcon } from "lucide-react";
import { useUser } from "@/context/userDataCookie";
import PerformanceChart from "@/components/PerformanceChart";
import QuizHistory from "@/components/QuizHistory";
import Leaderboard from "@/components/Leaderboard";
import AvatarUpload from "@/components/AvatarUpload";

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
    <motion.div className="w-full min-h-screen " {...fadeUp}>
      <motion.div className="max-w-4xl mx-auto p-6 space-y-6" {...fadeUp}>

        {/* HEADER */}
        <motion.div className="flex items-center justify-between gap-4" {...fadeUp}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {userLoading ? (
                <div className="w-full h-full bg-gray-300 animate-pulse" />
              ) : (
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  className="w-full h-full object-cover"
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
                <>
                  <h2 className="text-xl font-semibold">{user?.username}</h2>
                  <p className="text-sm text-gray-600">
                    Level {user?.level ?? level} • {user?.points ?? totalScore} poin
                  </p>
                </>
              )}
            </div>
          </div>

          {!userLoading && <AvatarUpload onUploaded={refreshUser} />}
        </motion.div>

        {/* STATS */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" {...fadeUp}>
          {[
            {
              label: "Total Poin",
              value: user?.points ?? totalScore,
              icon: <CheckCircleIcon className="text-blue-600" />,
              color: "blue"
            },
            {
              label: "Materi Dibaca",
              value: totalRead,
              icon: <FlameIcon className="text-orange-500" />,
              color: "green"
            },
            {
              label: "Level",
              value: user?.level ?? level,
              icon: <User2Icon className="text-yellow-600" />,
              color: "yellow"
            },
            {
              label: "Streak",
              value: user?.streak ?? streak,
              icon: <TrophyIcon className="text-purple-600" />,
              color: "purple"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 bg-${item.color}-50 rounded shadow`}
              {...fadeUp}
            >
              {progress === null ? (
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">{item.label}</p>
                    <p className={`text-xl font-bold text-${item.color}-700`}>
                      {item.value}
                    </p>
                  </div>
                  {item.icon}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CHART */}
        <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
          <h3 className="text-lg font-semibold mb-3">Statistik Anda</h3>

          {progress === null ? (
            <div className="h-40 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <PerformanceChart data={progress} />
          )}
        </motion.div>

        {/* SUMMARY */}
        <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
          <h4 className="font-semibold mb-3">Ringkasan</h4>

          {progress === null ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <>
              <SummaryRow label="Jawaban Benar" value={totalCorrect} color="green" />
              <SummaryRow label="Jawaban Salah" value={totalWrong} color="red" />
              <SummaryRow label="Materi Dibaca" value={materials.length} />

              {/* Progress bar */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Progress ke Level Berikutnya</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${(nextLevelProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-3">
                <h5 className="text-sm font-semibold">Badges</h5>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {badges.length ? (
                    badges.map((b, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-200 rounded text-xs">
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
        </motion.div>

        {/* QUIZ HISTORY */}
        <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
          <h4 className="font-semibold mb-3">Riwayat Quiz</h4>
          {progress === null ? (
            <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <QuizHistory userId={user?._id} />
          )}
        </motion.div>

        {/* LEADERBOARD */}
        <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
          <h4 className="font-semibold mb-3">Leaderboard</h4>
          <Leaderboard />
        </motion.div>

        {/* MATERI */}
        <motion.div className="bg-white p-4 rounded shadow mb-8" {...fadeUp}>
          <h4 className="font-semibold mb-3">Materi yang sudah dibaca</h4>

          {progress === null ? (
            <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
          ) : materials.length === 0 ? (
            <p className="text-sm text-gray-500">Belum membaca materi.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materials.map((m, idx) => {
                const count = progress.filter(
                  (p) => p.materialTitle === m && p.isRead
                ).length;

                return (
                  <li key={idx} className="p-3 rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{m}</span>
                      <span className="text-sm text-gray-600">{count} bagian</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
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
    green: "text-green-700",
    red: "text-red-700",
    blue: "text-blue-700",
    yellow: "text-yellow-700",
    orange: "text-orange-700",
    purple: "text-purple-700",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`font-medium ${color ? colorClass[color] : ""}`}>
        {value}
      </span>
    </div>
  );
}
