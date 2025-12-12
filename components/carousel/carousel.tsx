"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
}

export default function Carousel({ images }: Props) {
  return (
    <div className="w-full h-full">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={8}
        loop={true}
        autoplay={{ delay: 2000 }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        className="h-full rounded-xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full">
              {/* Gambar */}
              <img
                src={img}
                className="w-full h-full rounded-xl object-cover"
              />

              {/* GRADIENT OVERLAY */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 
                  bg-gradient-to-t from-[var(--accentColor)]/60 via-[var(--accentColor)]/20 to-transparent 
                  rounded-b-xl pointer-events-none"
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination berada DI LUAR */}
      <div className="custom-pagination flex items-center justify-center gap-1 mt-4 w-[50%]"></div>
    </div>
  );
}
