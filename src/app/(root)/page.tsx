"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Feather } from "lucide-react";
import { ReactTyped } from "react-typed";
import { Mouse } from 'lucide-react';
import Link from "next/link";

const PHRASES = [
  "Grow with them.",
  "Reflect daily.",
  "Cherish your journey.",
  "Write your story.",
  "Nurture your growth.",
];

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-[url(/hero-bg.jpg)] bg-cover bg-center">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-6 px-6 text-center animate-fadeIn">
        <Image
          src="/nest-logo.png"
          alt="Nest Logo"
          width={120}
          height={120}
          priority
          className="animate-fadeInSlow"
        />

        <h1 className="text-3xl font-black text-white font-nunito sm:text-5xl animate-fadeInUp">
          Keep your thoughts.
        </h1>
        <h2 className="font-nunito font-black text-3xl sm:text-5xl text-[#9BAB87] -mt-3 animate-fadeInUp">
          <ReactTyped
            strings={PHRASES}
            typeSpeed={40}
            backSpeed={50}
            backDelay={2500}
            loop
          />
        </h2>

        <p className="max-w-2xl text-lg font-medium text-white font-nunito sm:text-xl animate-fadeInUp">
          Nest is your safe, private journaling space. Capture memories,
          reflect on experiences, and watch your personal growth unfold — all in
          a beautifully simple interface.
        </p>

        <div className="flex gap-4 mt-4 animate-fadeInUp">
          <Link href={'/login'}>
            <Button
              size="lg"
              className="bg-[#9BAB87] group text-white cursor-pointer font-nunito font-semibold rounded-full px-6 sm:px-8 flex items-center gap-2 hover:bg-[#85976f] transition-all"
            >
              Create your Nest
              <ChevronRight
                size={20}
                className="transition-all group-hover:translate-x-1"
              />
            </Button>

          </Link>

          <Button
            size="lg"
            variant="outline"
            className="font-nunito group cursor-pointer font-semibold rounded-full px-6 sm:px-8 border-[#9BAB87] text-[#9BAB87] flex items-center gap-2 hover:bg-[#f3f5ef] hover:text-[#6f7f5a] transition-all"
          >
            Enter your Nest
            <Feather
              size={18}
              className="transition-transform opacity-70 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
      <Mouse size={40} color="white" className="absolute bottom-4 animate-bounce" />
    </div>
  );
}
