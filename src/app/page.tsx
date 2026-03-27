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

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: ["React", "Redux", "Redux-Saga", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "TailwindCSS"],
  },
  {
    category: "UI Libraries",
    items: ["MUI (Material UI)", "Ant Design"],
  },
  {
    category: "Maps & Real-time",
    items: ["Google Maps API", "Longdo Map", "MQTT", "WebSocket", "Tracking & Replay"],
  },
  {
    category: "Backend",
    items: ["Go (Golang)", "PHP (Laravel)", "REST API"],
  },
  {
    category: "Database",
    items: ["MySQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps / Tools",
    items: ["Docker", "Firebase", "Bitbucket Pipelines", "Git", "Figma", "Adobe XD"],
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
];

const PROJECTS: {
  title: string;
  tech: string;
  desc: string;
  gradient: string;
}[] = [
  {
    title: "CPAC GPS Center & Terminus",
    tech: "React · Go · PHP · MySQL · MongoDB · MQTT · Google Maps",
    desc: "Fleet platform supporting 50,000+ vehicles — real-time GPS, ADAS/DMS driver monitoring, MDVR streaming, geofencing, 77+ reports.",
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
  },
  {
    title: "SCG CPAC ToGo – Back Office",
    tech: "React · Redux-Saga · Ant Design · Firebase · Docker",
    desc: "Admin platform for SCG managing concrete orders — product config, plant & logistics management.",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
  },
  {
    title: "SCG CPAC ToGo – LINE LIFF",
    tech: "PHP · LINE LIFF · 2C2P Payment · Google Maps",
    desc: "Mobile web app on LINE for ordering concrete — map pinning, product selection, payment, and delivery tracking.",
    gradient: "from-emerald-600 via-green-500 to-teal-400",
  },
  {
    title: "SCB LCMS – Banking",
    tech: "React · MUI · REST API",
    desc: "Internal banking management system for SCB with dashboard and management UI, focused on performance.",
    gradient: "from-amber-500 via-orange-500 to-red-400",
  },
  {
    title: "ANP Merchant Platform",
    tech: "React · TailwindCSS",
    desc: "Ticket management platform for merchants with improved UX and reusable component architecture.",
    gradient: "from-rose-600 via-pink-500 to-fuchsia-400",
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
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
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
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
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
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    up: { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    scale: { hidden: { scale: 0.85, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a href="#" className="text-lg font-extrabold" whileHover={{ scale: 1.05 }}>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Thikhamporn</span>
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
              className="relative px-4 py-2 text-[13px] text-slate-500 hover:text-blue-600 transition-colors font-semibold group"
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </div>

        <button className="md:hidden text-slate-800" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 overflow-hidden"
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

/* ───────────────────────── HERO (COMPACT) ───────────────────────── */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
      <motion.div
        className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-400/[0.07] rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-cyan-400/[0.07] rounded-full blur-3xl"
        animate={{ scale: [1.15, 1, 1.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-3xl text-center px-6 pt-16">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 p-[2px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent">T</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
          >
            Thikhamporn
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent"
          >
            O-Siri
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-5 text-base sm:text-lg text-slate-400 font-semibold tracking-wide"
        >
          Frontend / Fullstack Developer &middot; 4+ Years Experience
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-3 text-slate-400 leading-relaxed max-w-xl mx-auto text-sm"
        >
          Building large-scale enterprise platforms in Fleet Management,
          Logistics, Fintech, and E-Commerce with cutting-edge technologies.
        </motion.p>

        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {[
            { icon: <PhoneIcon />, text: "083-008-5804", href: "tel:0830085804" },
            { icon: <MailIcon />, text: "planpopx78@gmail.com", href: "mailto:planpopx78@gmail.com" },
            { icon: <GitHubIcon />, text: "Planos78", href: "https://github.com/Planos78" },
            { icon: <LinkedInIcon />, text: "LinkedIn", href: "https://linkedin.com/in/thikhamporn-o-siri-375b47198" },
            { icon: <LocationIcon />, text: "Bangkok" },
          ].map((item, i) => (
            <motion.span key={i} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100 shadow-sm"
                >
                  {item.icon} {item.text}
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs text-slate-500 border border-slate-100 shadow-sm">
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
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center gap-3"
        >
          <MagneticButton
            href="#projects"
            className="group relative px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-sm overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
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
            className="px-7 py-3 border-2 border-slate-200 rounded-xl font-semibold text-sm text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 mx-auto border-2 border-slate-300 rounded-full flex justify-center pt-1.5"
          >
            <motion.div className="w-1 h-1 bg-slate-400 rounded-full" />
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
      <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tabular-nums">
        {formatted}
        <span className="text-blue-500">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
            >
              <StatCounter stat={stat} inView={inView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT (SCROLL TEXT REVEAL) ───────────────────────── */

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words =
    "Frontend-focused Fullstack Developer with 4+ years of experience building large-scale enterprise platforms. I specialize in the React ecosystem, real-time data systems (MQTT/WebSocket), and map-based applications (Google Maps, Longdo Map). Proven ability to handle complex production systems at scale — 50,000+ vehicles, debug critical issues, and deliver clean, high-performance interfaces.".split(" ");

  return (
    <section id="about" ref={ref} className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">About Me</p>
        </ScrollReveal>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-relaxed">
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
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {children}
    </motion.span>
  );
}

/* ───────────────────────── SKILLS (EQUAL GRID) ───────────────────────── */

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3 text-center">Technical Skills</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-3">
            Tools I Use
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 text-center mb-12 text-sm max-w-md mx-auto">
            Technologies I work with daily to build high-performance applications
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 0.06} direction="scale">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-shadow"
              >
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, j) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03 + i * 0.03 }}
                      whileHover={{ scale: 1.08, backgroundColor: "rgb(59 130 246)", color: "white" }}
                      className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg font-medium cursor-default transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.9"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Experience</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-12">
            Where I&apos;ve Made{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">an Impact</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Animated timeline */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 hidden sm:block">
            <motion.div className="w-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" style={{ height: lineHeight }} />
          </div>

          <div className="sm:pl-14">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-1">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Freewill FX</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-0.5">Frontend / Fullstack Developer</p>
                </div>
                <p className="text-slate-400 text-xs mt-1 sm:mt-0 font-mono">Jul 2021 – Present</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mb-6 mt-3 flex flex-wrap gap-2">
                {["Fleetlink", "CPAC GPS Center", "Terminus Fleet Platform"].map((p) => (
                  <span key={p} className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] rounded-full font-bold border border-blue-100">
                    {p}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ul className="space-y-3">
              {EXPERIENCE_ITEMS.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <motion.li
                    className="flex gap-3 group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="mt-[7px] flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:scale-150 transition-transform" />
                    <span className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-800 transition-colors">{item}</span>
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
    <section id="projects" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 text-center">Notable Projects</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">
            Production Systems{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">I&apos;ve Built</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-slate-400 text-center mb-12 text-sm max-w-md mx-auto">
            Real-world enterprise applications serving thousands of users daily
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08} direction="scale">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group h-full bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-500/50 transition-all"
              >
                {/* Gradient header */}
                <div className={`h-24 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%", skewX: "-12deg" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">{p.title}</h3>
                  <p className="text-[11px] text-slate-400 font-mono mb-3">{p.tech}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.desc}</p>
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
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3 text-center">Background</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">Education & Awards</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal direction="left">
            <motion.div whileHover={{ y: -4 }} className="h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zM12 14v7" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="font-extrabold text-slate-900">KMITL</h3>
                  <p className="text-xs text-slate-400 font-mono">2017 – 2021</p>
                </div>
              </div>
              <p className="text-slate-800 font-semibold text-sm">King Mongkut&apos;s Institute of Technology Ladkrabang</p>
              <p className="text-slate-400 text-sm mt-1">B.Eng — Computer Engineering</p>
            </motion.div>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal direction="right">
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-extrabold text-slate-900 mb-3">Awards</h3>
                <ul className="space-y-2">
                  {["Mobile Application D-Industry – 2nd Runner Up", "Robot Contest KMITL 2017 – Top 10"].map((award, i) => (
                    <motion.li key={i} whileHover={{ x: 4 }} className="flex items-center gap-2 text-sm text-slate-500">
                      <motion.span animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 + i }} className="text-amber-500">&#9733;</motion.span>
                      {award}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-extrabold text-slate-900 mb-3">Languages</h3>
                {[
                  { lang: "Thai", level: "Native", width: "100%" },
                  { lang: "English", level: "Conversational", width: "70%" },
                ].map((l) => (
                  <div key={l.lang} className="mb-2 last:mb-0">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-500 font-medium">{l.lang}</span>
                      <span className="text-blue-600 font-semibold text-xs">{l.level}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: l.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
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
    <section id="contact" className="relative py-24 px-6 bg-slate-900 text-white overflow-hidden">
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">Get in Touch</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">Something Great</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm">
            I&apos;m open to new opportunities and interesting projects. Feel free to reach out!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            <MagneticButton
              href="mailto:planpopx78@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/20 text-white"
            >
              <MailIcon /> planpopx78@gmail.com
            </MagneticButton>
            <MagneticButton
              href="tel:0830085804"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 rounded-xl font-semibold text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all text-white"
            >
              <PhoneIcon /> 083-008-5804
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex justify-center gap-4">
            {[
              { icon: <GitHubIcon />, href: "https://github.com/Planos78", label: "GitHub" },
              { icon: <LinkedInIcon />, href: "https://linkedin.com/in/thikhamporn-o-siri-375b47198", label: "LinkedIn" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors"
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
          className="mt-16 text-slate-600 text-xs"
        >
          &copy; {new Date().getFullYear()} Thikhamporn O-Siri. Built with Next.js, TailwindCSS & Framer Motion.
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
