"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSectionOne() {
  const router=useRouter();
  const {user}=useUser();
  return (
    <div className="relative my-10 flex flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Transform Healthcare with AI Medical Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Provide 24/7 intelligent medical support using conversational AI. Triage symptoms, book appointments, and deliver empathetic care with voice-first automation.
        </motion.p>
        
        
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {user ? (
            // If user is logged in, show Dashboard button
            <Button 
              onClick={() => router.push('/dashboard')}
              className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Start Consulting
            </Button>
          ) : (
            // If user is not logged in, show Explore Now button that goes to home
            <Link href={'/sign-up'}>
              
              <button 
              className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Explore Now
              </button>
            </Link>
          )}
        </motion.div>
        
       
      </div>
      
    </div>
  );
}

const Navbar = () => {
  const router=useRouter();
  const {user}=useUser();
  
   return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-3 sm:py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Responsive Text */}
        <Link href="/dashboard">
                <Image src={'/logo.svg'} alt='logo' width={250} height={70} />
        </Link>
      </div>
      
      {!user ? (
        <Link href={'/sign-in'}>
          <button className="w-20 sm:w-24 transform rounded-lg bg-black px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-xs sm:text-sm">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-3 sm:gap-4 md:gap-5 items-center">
          <UserButton />
         <Button 
  className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
  onClick={() => router.push('/dashboard')}
>
  Dashboard
</Button>
        </div>
      )} 
    </nav>
  );
};
