"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

// Brand colors extracted from logo
// Primary blue:  #3754FA
// Deep navy:     #19214F

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Voice-First Triage",
    desc: "Patients describe symptoms naturally. Our AI listens, understands, and guides them to the right care path instantly.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Smart Scheduling",
    desc: "Automate appointment booking with intelligent calendar integration. No hold times, no friction.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "HIPAA Compliant",
    desc: "Enterprise-grade security built-in. All conversations are encrypted, auditable, and fully compliant.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Responses",
    desc: "Sub-800ms response times mean patients never wait. Our infrastructure scales with your clinic's demand.",
  },
];

const stats = [
  { value: "99.8%", label: "Uptime SLA" },
  { value: "< 800ms", label: "Voice response time" },
  { value: "40+", label: "Languages supported" },
];

const FLAG_KEY = "medivoice_left_for_auth";

function markAndGo(router: ReturnType<typeof useRouter>, path: string) {
  sessionStorage.setItem(FLAG_KEY, "true");
  router.push(path);
}

interface HeroSectionProps {
  onLoad?: () => void;
}

export default function HeroSection({ onLoad }: HeroSectionProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  
  if (isLoaded && user && sessionStorage.getItem(FLAG_KEY) === "true") {
    router.replace("/dashboard");
    return null;
  }

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white text-[#19214F] overflow-hidden">

      {/* ── Grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(55,84,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(55,84,250,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Top radial glow in brand blue ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[580px] rounded-full z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(55,84,250,0.10) 0%, rgba(55,84,250,0.04) 45%, transparent 70%)",
        }}
      />

      {/* ══════════ NAVBAR ══════════ */}
      <nav className="relative z-20 w-full border-b border-[#3754FA]/10 bg-white/90 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MediVoice AI" width={160} height={36} className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#19214F]/50">
            {["Features", "How it works", "Pricing", "Docs"].map((item) => (
              <Link key={item} href="#" className="hover:text-[#19214F] transition-colors">
                {item}
              </Link>
            ))}
          </div>

          

          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <>
                <button
                  onClick={() => markAndGo(router, "/sign-in")}
                  className="text-sm font-medium text-[#19214F]/60 hover:text-[#19214F] transition-colors px-3 py-2"
                >
                  Sign in
                </button>

                <button
                  onClick={() => markAndGo(router, "/sign-up")}
                  className="group rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
                  style={{
                    background: "#3754FA",
                    boxShadow: "0 4px 14px rgba(55,84,250,0.30)"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#2a44e8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#3754FA")}
                >
                  Get started free
                  <span className="ml-1.5 inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* Profile Button (Clerk built-in) */}
                <UserButton afterSignOutUrl="/" />

                {/* View Button */}
                <button
                  onClick={() => markAndGo(router, "/dashboard")}
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
                  style={{
                    background: "#3754FA",
                    boxShadow: "0 4px 14px rgba(55,84,250,0.30)"
                  }}
                >
                  Start Consulting
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{ borderColor: "rgba(55,84,250,0.25)", background: "rgba(55,84,250,0.06)", color: "#3754FA" }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#3754FA" }} />
          Now live — AI-powered medical voice agents
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[5rem] font-extrabold leading-[1.07] tracking-tight"
          style={{ color: "#19214F" }}
        >
          Healthcare that{" "}
          <span style={{ background: "linear-gradient(135deg, #3754FA 0%, #5b73ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            listens
          </span>
          ,<br />answers, and acts.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "rgba(25,33,79,0.55)" }}
        >
          Deploy conversational voice agents that triage symptoms, book appointments,
          and deliver empathetic 24/7 care — no human operators required.
        </motion.p>

        {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            {!isSignedIn ? (
              <>
                {/* Start for free */}
                <button
                  onClick={() => markAndGo(router, "/sign-up")}
                  className="group rounded-xl px-9 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] bg-[#19214F] shadow-[0_8px_24px_rgba(25,33,79,0.18)] hover:bg-[#232d6b]"
                >
                  Start for free
                  <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>

                {/* Watch demo */}
                <button
                  onClick={() => router.push("#demo")}
                  className="flex items-center gap-2.5 rounded-xl border bg-white px-8 py-4 text-base font-semibold transition-all hover:shadow-md border-[#3754FA]/20 text-[#19214F]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] bg-[#3754FA]/10 text-[#3754FA]">
                    ▶
                  </span>
                  Watch demo
                </button>
              </>
            ) : (
              <>
                {/* Dashboard CTA */}
                <button
                  onClick={() => markAndGo(router, "/dashboard")}
                  className="group rounded-xl px-9 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] bg-[#19214F] shadow-[0_8px_24px_rgba(25,33,79,0.18)] hover:bg-[#232d6b]"
                >
                  Go to Dashboard
                  <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>

                {/* Demo still available */}
                <button
                  onClick={() => router.push("#demo")}
                  className="flex items-center gap-2.5 rounded-xl border bg-white px-8 py-4 text-base font-semibold transition-all hover:shadow-md border-[#3754FA]/20 text-[#19214F]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] bg-[#3754FA]/10 text-[#3754FA]">
                    ▶
                  </span>
                  Watch demo
                </button>
              </>
            )}
          </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-7 text-xs tracking-wide"
          style={{ color: "rgba(25,33,79,0.35)" }}
        >
          Trusted by 200+ clinics · No credit card required · HIPAA compliant
        </motion.p>
      </section>

      {/* ══════════ STATS ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="relative z-10 max-w-3xl mx-auto px-6 pb-20"
      >
        <div
          className="grid grid-cols-3 divide-x divide-[#3754FA]/10 rounded-2xl border bg-white"
          style={{
            borderColor: "rgba(55,84,250,0.15)",
            boxShadow: "0 8px 32px rgba(55,84,250,0.08)"
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center px-6 py-7 gap-1">
              <span className="text-3xl font-bold" style={{ color: "#3754FA" }}>{value}</span>
              <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: "rgba(25,33,79,0.40)" }}>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ══════════ FEATURES ══════════ */}
      <section
        className="relative z-10 border-t px-6 py-24"
        style={{ background: "rgba(55,84,250,0.03)", borderColor: "rgba(55,84,250,0.10)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#19214F" }}>Why MediVoice AI?</h2>
            <p className="mt-3 text-lg" style={{ color: "rgba(25,33,79,0.55)" }}>
              Purpose-built voice agents that understand healthcare workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-2xl border bg-white p-7 transition-shadow hover:shadow-lg"
                style={{ borderColor: "rgba(55,84,250,0.12)", boxShadow: "0 2px 12px rgba(55,84,250,0.05)" }}
              >
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(55,84,250,0.08)", color: "#3754FA" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "#19214F" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(25,33,79,0.55)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA FOOTER ══════════ */}
      <section className="relative z-10 overflow-hidden border-t px-6 py-24 text-center" style={{ borderColor: "rgba(55,84,250,0.10)", background: "#19214F" }}>

        {/* Background glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3754FA, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3754FA, transparent 70%)" }} />

        {/* Subtle grid on dark bg */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#3754FA] animate-pulse" />
            Join 200+ clinics already using MediVoice AI
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to transform<br />your clinic?
          </h2>
          <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            Deploy your first AI voice agent in minutes. No engineering team required.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isSignedIn ? (
              <>
                {/* Get started */}
                <button
                  onClick={() => markAndGo(router, "/sign-up")}
                  className="group rounded-xl px-10 py-4 text-base font-bold text-[#19214F] transition-all hover:scale-[1.02] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:bg-[#eef0ff]"
                >
                  Get started free
                  <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>

                {/* Sign in */}
                <button
                  onClick={() => markAndGo(router, "/sign-in")}
                  className="rounded-xl border px-9 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 border-white/20"
                >
                  Sign in to dashboard
                </button>
              </>
            ) : (
              <>
                {/* Dashboard */}
                <button
                  onClick={() => markAndGo(router, "/dashboard")}
                  className="group rounded-xl px-10 py-4 text-base font-bold text-[#19214F] transition-all hover:scale-[1.02] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:bg-[#eef0ff]"
                >
                  Go to Dashboard
                  <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>

                {/* Optional secondary */}
                <button
                  onClick={() => markAndGo(router, "/dashboard/profile")}
                  className="rounded-xl border px-9 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 border-white/20"
                >
                  View Profile
                </button>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            {[
              { icon: "🔒", text: "HIPAA Compliant" },
              { icon: "⚡", text: "Setup in 5 minutes" },
              { icon: "🌍", text: "40+ Languages" },
              { icon: "💳", text: "No credit card required" },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs font-medium">
                <span>{icon}</span> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}