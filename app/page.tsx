"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white text-center drop-shadow-lg"
        >
          Welcome to the Future
        </h1>
      </div>
    </main>
  );
}