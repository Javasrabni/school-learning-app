"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userDataCookie";
import { motion } from "framer-motion";
import { BrainIcon, WaypointsIcon } from "lucide-react";

type Material = {
  _id: string;
  title: string;
  class: number;
  subTopics: { title: string }[];
};

type ProgressType = {
  materialTitle: string;
  subTopicIndex: number;
  isRead: boolean;
  score: number;
};

export const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 }
};

export default function ProgressPage() {
  const { user } = useUser();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const router = useRouter();

  // disable sticky scroll behaviour
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        setMaterials(data);
      } finally {
        setLoadingMaterials(false);
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (!user?._id) {
      setProgress([]);
      setLoadingProgress(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress?userId=${user._id}`);
        const data = await res.json();
        setProgress(data);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [user]);

  const isLoading = loadingMaterials || loadingProgress;

  const renderSkeletonCard = () => (
    <div className="bg-white border rounded-xl p-5 shadow-sm animate-pulse">
      <div className="h-5 bg-neutral-200 rounded w-2/3"></div>
      <div className="mt-3 h-4 bg-neutral-200 rounded w-1/4"></div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-neutral-200 rounded w-full"></div>
        <div className="h-3 bg-neutral-200 rounded w-4/5"></div>
        <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <motion.div
      {...fadeUp}
      className="px-6 space-y-8"
    >
      {/* Title */}
      <motion.div {...fadeUp} className="flex flex-col gap-1">
        <span className="flex flex-row gap-2 items-center">
          <WaypointsIcon width={16} />
          <h1 className="text-base font-semibold font-[poppins]">Silabus dan materi belajar</h1>
        </span>
        <p className="text-xs text-stone-400">
          Mulai belajar matematika sesuai dengan tingkatan kamu, mulai dari kelas 7 - 9.
        </p>
      </motion.div>

      {[7, 8, 9].map((cls, cindex) => {
        const filtered = materials.filter((m) => m.class === cls);

        return (
          <motion.section
            key={cls}
            {...fadeUp}
            transition={{ duration: 0.35, delay: cindex * 0.15 }}
            className="space-y-4"
          >
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-xl font-semibold"
            >
              Kelas {cls}
            </motion.h2>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {/* Skeleton */}
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>{renderSkeletonCard()}</div>
                ))}

              {/* Data cards */}
              {!isLoading &&
                filtered.map((m, index) => {
                  const completed = progress.filter(
                    (p) => p.materialTitle === m.title && p.isRead
                  ).length;

                  const percentage = Math.round(
                    (completed / m.subTopics.length) * 100
                  );

                  return (
                    <motion.div
                      key={m._id}
                      {...fadeUp}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.07
                      }}
                      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                      onClick={() => router.push(`/dashboard/material/${m._id}`)}
                    >
                      <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="flex justify-between items-start"
                      >
                        <h3 className="font-semibold text-lg">{m.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${percentage === 100
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-blue-100 text-blue-700 border border-blue-300"
                            }`}
                        >
                          {percentage}%
                        </span>
                      </motion.div>

                      <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-sm text-neutral-500 mt-1"
                      >
                        {completed}/{m.subTopics.length} sub-topik selesai
                      </motion.p>

                      <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="mt-4 bg-neutral-100 rounded-lg p-3 max-h-32 overflow-y-auto"
                      >
                        <motion.ul
                          {...fadeUp}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="text-sm space-y-1"
                        >
                          {m.subTopics.map((s, idx) => {
                            const read = progress.some(
                              (p) =>
                                p.materialTitle === m.title &&
                                p.subTopicIndex === idx &&
                                p.isRead
                            );

                            return (
                              <motion.li
                                key={idx}
                                {...fadeUp}
                                transition={{
                                  duration: 0.25,
                                  delay: 0.25 + idx * 0.02
                                }}
                                className={`flex items-center gap-2 ${read ? "text-green-700 font-medium" : ""
                                  }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${read ? "bg-green-500" : "bg-gray-400"
                                    }`}
                                />
                                {s.title}
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}
