"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Footer from "@/components/ui/footer";

const HeroSection = dynamic(() => import("./components/sections/HeroSection"), {
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="h-[400px] w-[90%] animate-pulse rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
    </div>
  ),
  ssr: false,
});

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);

  const handleHeroLoad = () => {
    setTimeout(() => {
      setShowFooter(true);
    }, 1000);
  };

  return (
    <>
      <HeroSection onLoad={handleHeroLoad} />

      {showFooter ? (
        <Footer />
      ) : (
        <div className="h-20" /> // prevents layout jump
      )}
    </>
  );
}