"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

/* ───────────────────────── DATA ───────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SKILLS: { category: string; icon: string; items: string[] }[] = [
  {
    category: "Frontend",
    icon: "01",
    items: [
      "React",
      "Redux",
      "Redux-Saga",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "TailwindCSS",
    ],
  },
  {
    category: "UI Libraries",
    icon: "02",
    items: ["MUI (Material UI)", "Ant Design"],
  },
  {
    category: "Maps & Real-time",
    icon: "03",
    items: [
      "Google Maps API",
      "Longdo Map",
      "MQTT",
      "WebSocket",
      "Vehicle Tracking & Replay",
    ],
  },
  {
    category: "Backend",
    icon: "04",
    items: ["Go", "PHP", "REST API Development"],
  },
  { category: "Database", icon: "05", items: ["MySQL", "MongoDB"] },
  {
    category: "DevOps / Tools",
    icon: "06",
    items: [
      "Docker",
      "Firebase",
      "Bitbucket Pipelines",
      "Git",
      "Figma",
      "Adobe XD",
    ],
  },
  {
    category: "AI Tools",
    icon: "07",
    items: ["Cursor", "Claude Code", "ChatGPT", "Google Antigravity"],
  },
];

const STATS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50000, suffix: "+", label: "Vehicles Tracked" },
  { value: 70, suffix: "+", label: "Reports Built" },
  { value: 5, suffix: "+", label: "Major Projects" },
];

const EXPERIENCE_ITEMS = [
  "Developed and maintained large-scale fleet management platform supporting 50,000+ vehicles",
  "Implemented real-time vehicle tracking via MQTT WebSocket with Google Maps and Longdo Map integrations",
  "Built vehicle replay, geofencing, and live video streaming (MDVR) features",
  "Developed ADAS/DMS driver behavior analytics dashboard (fatigue, speeding, harsh braking detection)",
  "Built and optimized 70+ reporting modules for operational and logistics analytics",
  "Developed delivery management features: trip planning, routing, and order tracking",
  "Wrote and maintained REST APIs (Go, PHP) for vehicle data, CRUD operations, and reports",
  "Diagnosed and resolved critical production bugs and performed ongoing maintenance across all projects",
  "Applied global UI theme updates ensuring visual consistency across multiple large-scale projects",
];

const PROJECTS: {
  title: string;
  tech: string;
  desc: string;
  gradient: string;
  accent: string;
}[] = [
  {
    title: "CPAC GPS Center & Terminus",
    tech: "React · Go · PHP · MySQL · MongoDB · MQTT · Google Maps · Longdo Map",
    desc: "Fleet platform supporting 50,000+ vehicles — real-time GPS, ADAS/DMS driver monitoring, MDVR streaming, geofencing, 77+ reports.",
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    accent: "blue",
  },
  {
    title: "SCG CPAC ToGo – Back Office",
    tech: "React · Redux-Saga · Ant Design · Firebase · Docker",
    desc: "Admin platform for SCG managing concrete orders — product config (Strength, Slump, Structure), plant & logistics management.",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    accent: "violet",
  },
  {
    title: "SCG CPAC ToGo – LINE LIFF App",
    tech: "PHP · LINE LIFF · 2C2P Payment · Google Maps · Longdo Map",
    desc: "Mobile web app on LINE for ordering concrete — map pinning, product selection, payment, and delivery tracking.",
    gradient: "from-emerald-600 via-green-500 to-teal-400",
    accent: "emerald",
  },
  {
    title: "SCB LCMS – Banking Back Office",
    tech: "React · MUI",
    desc: "Internal banking management system for SCB with dashboard and management UI, focused on performance and maintainability.",
    gradient: "from-amber-500 via-orange-500 to-red-400",
    accent: "amber",
  },
  {
    title: "ANP Merchant Platform",
    tech: "React · TailwindCSS",
    desc: "Ticket management platform for merchants with improved UX and reusable component architecture.",
    gradient: "from-rose-600 via-pink-500 to-fuchsia-400",
    accent: "rose",
  },
];

/* ───────────────────────── HOOKS ───────────────────────── */

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);
  return count;
}

/* ───────────────────────── ICONS ───────────────────────── */

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ───────────────────────── MAGNETIC BUTTON ───────────────────────── */

function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ───────────────────────── FLOATING PARTICLES ───────────────────────── */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── TEXT REVEAL ───────────────────────── */

/* ───────────────────────── SCROLL REVEAL ───────────────────────── */

function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    up: { hidden: { y: 80, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: -80, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 80, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── NAVBAR ───────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Thikhamporn
          </span>
          <span className="text-slate-800">.Dev</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="relative px-4 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </div>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 overflow-hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block py-3 text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
        <FloatingParticles />
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-4xl text-center px-6">
        {/* Animated avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative w-32 h-32 mx-auto mb-10"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
            <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              T
            </span>
          </div>
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ top: 0, left: "50%", transformOrigin: "0 64px" }}
          />
        </motion.div>

        {/* Title with stagger reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.1] tracking-tight"
          >
            Thikhamporn
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent"
          >
            O-Siri
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-lg sm:text-xl text-slate-500 font-medium"
        >
          Frontend / Fullstack Developer &middot; 4+ Years Experience
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-4 text-slate-400 leading-relaxed max-w-2xl mx-auto"
        >
          Building large-scale enterprise platforms in Fleet Management,
          Logistics, Fintech, and E-Commerce with cutting-edge technologies.
        </motion.p>

        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: <PhoneIcon />, text: "083-008-5804", href: "tel:0830085804" },
            { icon: <MailIcon />, text: "planpopx78@gmail.com", href: "mailto:planpopx78@gmail.com" },
            { icon: <GitHubIcon />, text: "Planos78", href: "https://github.com/Planos78" },
            { icon: <LinkedInIcon />, text: "LinkedIn", href: "https://linkedin.com/in/thikhamporn-o-siri-375b47198" },
            { icon: <LocationIcon />, text: "Bangkok, Thailand" },
          ].map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 transition-all border border-slate-200/50"
                >
                  {item.icon} {item.text}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-slate-500 border border-slate-200/50">
                  {item.icon} {item.text}
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold overflow-hidden shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          >
            <span className="relative z-10">View Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-4 border-2 border-slate-200 rounded-2xl font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all hover:shadow-lg"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 mx-auto border-2 border-slate-300 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── STATS ───────────────────────── */

function StatCounter({ stat, inView }: { stat: (typeof STATS)[0]; inView: boolean }) {
  const count = useCountUp(stat.value, inView);
  const formatted = stat.value >= 1000 ? count.toLocaleString() : count;
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {formatted}
        {stat.suffix}
      </div>
      <div className="mt-2 text-slate-500 text-sm font-medium">{stat.label}</div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-100"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
            >
              <StatCounter stat={stat} inView={inView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT (TEXT REVEAL) ───────────────────────── */

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const words =
    "Frontend-focused Fullstack Developer with 4+ years of experience building large-scale enterprise platforms. I specialize in the React ecosystem, real-time data systems (MQTT/WebSocket), and map-based applications (Google Maps, Longdo Map). Proven ability to handle complex production systems at scale (50,000+ vehicles), debug critical issues, and deliver clean, high-performance interfaces.".split(
      " "
    );

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-6">
            About Me
          </p>
        </ScrollReveal>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-snug">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em] transition-opacity duration-100">
      {children}
    </motion.span>
  );
}

/* ───────────────────────── SKILLS ───────────────────────── */

function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 text-center">
            Technical Skills
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 text-center mb-4">
            Tools I Use
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-slate-500 text-center mb-16 max-w-lg mx-auto">
            Technologies I work with daily to build high-performance applications
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((group, i) => (
            <ScrollReveal
              key={group.category}
              delay={i * 0.08}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all border border-slate-100 overflow-hidden"
              >
                {/* Background number */}
                <span className="absolute -top-4 -right-2 text-8xl font-black text-slate-50 group-hover:text-blue-50 transition-colors select-none">
                  {group.icon}
                </span>
                <div className="relative">
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 + i * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgb(59 130 246)",
                          color: "white",
                        }}
                        className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm rounded-xl font-medium cursor-default transition-colors"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── EXPERIENCE ───────────────────────── */

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.9"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
            Experience
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-16">
            Where I&apos;ve Made
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              an Impact
            </span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 hidden sm:block">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="sm:pl-16">
            {/* Company header */}
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-2">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    Freewill FX
                  </h3>
                  <p className="text-blue-600 font-semibold mt-1">
                    Frontend / Fullstack Developer
                  </p>
                </div>
                <p className="text-slate-400 text-sm mt-1 sm:mt-0 font-mono">
                  Jul 2021 – Present
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mb-8 mt-4 flex flex-wrap gap-2">
                {["Fleetlink", "CPAC GPS Center", "Terminus Fleet Platform"].map(
                  (p) => (
                    <motion.span
                      key={p}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs rounded-full font-bold border border-blue-100"
                    >
                      {p}
                    </motion.span>
                  )
                )}
              </div>
            </ScrollReveal>

            <ul className="space-y-4">
              {EXPERIENCE_ITEMS.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <motion.li
                    className="flex gap-4 group"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mt-2 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/50 group-hover:scale-150 transition-transform" />
                    <span className="text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PROJECTS ───────────────────────── */

function Projects() {
  return (
    <section
      id="projects"
      className="py-32 px-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4 text-center">
            Notable Projects
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Production Systems
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              I&apos;ve Built
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-slate-400 text-center mb-16 max-w-lg mx-auto">
            Real-world enterprise applications serving thousands of users daily
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1} direction="scale">
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all"
              >
                {/* Animated gradient header */}
                <div className={`h-32 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%", rotate: 12 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-6xl font-black text-white/20"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-4 leading-relaxed">
                    {p.tech}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── EDUCATION ───────────────────────── */

function Education() {
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4 text-center">
            Education & Awards
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 text-center mb-16">
            Background
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zM12 14v7"
                    />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">KMITL</h3>
                  <p className="text-sm text-slate-400 font-mono">2017 – 2021</p>
                </div>
              </div>
              <p className="text-slate-800 font-semibold">
                King Mongkut&apos;s Institute of Technology Ladkrabang
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Bachelor of Engineering – Computer Engineering
              </p>
            </motion.div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal direction="right">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Awards</h3>
                <ul className="space-y-3">
                  {[
                    "Mobile Application D-Industry – 2nd Runner Up",
                    "Robot Contest KMITL 2017 – Top 10",
                  ].map((award, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <motion.span
                        animate={{ rotate: [0, 20, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 2 + i,
                        }}
                        className="text-amber-500 text-lg"
                      >
                        &#9733;
                      </motion.span>
                      {award}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Languages</h3>
                <ul className="space-y-3">
                  {[
                    { lang: "Thai", level: "Native", width: "100%" },
                    { lang: "English", level: "Conversational", width: "70%" },
                  ].map((l) => (
                    <li key={l.lang}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-600 font-medium">
                          {l.lang}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {l.level}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: l.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">
            Get in Touch
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            Let&apos;s Build
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-slate-400 max-w-lg mx-auto mb-12 text-lg">
            I&apos;m open to new opportunities and interesting projects. Feel
            free to reach out!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="mailto:planpopx78@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow text-white"
            >
              <MailIcon /> planpopx78@gmail.com
            </MagneticButton>
            <MagneticButton
              href="tel:0830085804"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-700 rounded-2xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all text-white"
            >
              <PhoneIcon /> 083-008-5804
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex justify-center gap-6">
            {[
              { icon: <GitHubIcon />, href: "https://github.com/Planos78", label: "GitHub" },
              {
                icon: <LinkedInIcon />,
                href: "https://linkedin.com/in/thikhamporn-o-siri-375b47198",
                label: "LinkedIn",
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-slate-600 text-sm"
        >
          &copy; {new Date().getFullYear()} Thikhamporn O-Siri. Built with
          Next.js, TailwindCSS & Framer Motion.
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
