"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Feather } from "lucide-react";
import { useState, useEffect } from "react";

const PHRASES = [
  "Grow with them.",
  "Reflect daily.",
  "Cherish your journey.",
  "Write your story.",
  "Nurture your growth.",
];

export default function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;
    
    const handleTyping = () => {
      if(!isDeleting){
        if(textIndex < currentPhrase.length){
          setText(currentPhrase.slice(0, textIndex + 1));
          setTextIndex((prevIndex) => prevIndex + 1);
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      }
      else{
        if(textIndex > 0){
          setText(currentPhrase.slice(0, textIndex - 1));
          setTextIndex((prevIndex) => prevIndex - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
        }
      }
    }
    const typingInterval = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingInterval);


  }, [phraseIndex, textIndex, isDeleting]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-6 px-6 text-center">
        <Image
          src="/nest-logo.png"
          alt="Nest Logo"
          width={120}
          height={120}
          priority
        />

        <h1 className="font-nunito font-black text-4xl sm:text-5xl text-[#2D2D2D]">
          Keep your thoughts.
        </h1>
        <h2 className="font-nunito font-black text-4xl sm:text-5xl text-[#9BAB87] -mt-3 min-h-[2.5rem]">
          {text}
          <span className="animate-pulse">|</span>
        </h2>

        <p className="font-nunito text-lg sm:text-xl font-medium text-[#444] max-w-2xl">
          Nest is your safe, private journaling space. Capture memories,
          reflect on experiences, and watch your personal growth unfold — all in
          a beautifully simple interface.
        </p>

        <div className="flex gap-4 mt-4">
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
    </div>
  );
}
