"use client";

import { useState } from "react";

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
  { category: "UI Libraries", items: ["MUI (Material UI)", "Ant Design"] },
  {
    category: "Maps & Real-time",
    items: [
      "Google Maps API",
      "Longdo Map",
      "MQTT",
      "WebSocket",
      "Vehicle Tracking & Replay",
    ],
  },
  { category: "Backend", items: ["Go", "PHP", "REST API Development"] },
  { category: "Database", items: ["MySQL", "MongoDB"] },
  {
    category: "DevOps / Tools",
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
    items: ["Cursor", "Claude Code", "ChatGPT", "Google Antigravity"],
  },
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
  color: string;
}[] = [
  {
    title: "CPAC GPS Center & Terminus",
    tech: "React · Go · PHP · MySQL · MongoDB · MQTT · Google Maps · Longdo Map",
    desc: "Fleet platform supporting 50,000+ vehicles — real-time GPS, ADAS/DMS driver monitoring, MDVR streaming, geofencing, 77+ reports.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "SCG CPAC ToGo – Back Office",
    tech: "React · Redux-Saga · Ant Design · Firebase · Docker",
    desc: "Admin platform for SCG managing concrete orders — product config (Strength, Slump, Structure), plant & logistics management.",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "SCG CPAC ToGo – LINE LIFF App",
    tech: "PHP · LINE LIFF · 2C2P Payment · Google Maps · Longdo Map",
    desc: "Mobile web app on LINE for ordering concrete — map pinning, product selection, payment, and delivery tracking.",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "SCB LCMS – Banking Back Office",
    tech: "React · MUI",
    desc: "Internal banking management system for SCB with dashboard and management UI, focused on performance and maintainability.",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "ANP Merchant Platform",
    tech: "React · TailwindCSS",
    desc: "Ticket management platform for merchants with improved UX and reusable component architecture.",
    color: "from-rose-500 to-pink-500",
  },
];

/* ───────────────────────── ICONS (inline SVG) ───────────────────────── */

function PhoneIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
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
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/* ───────────────────────── COMPONENTS ───────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-primary">
          Plan<span className="text-dark">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-text hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-dark"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-gray-text hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="max-w-3xl text-center">
        {/* Avatar placeholder */}
        <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-200">
          T
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight">
          Thikhamporn{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            O-Siri
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-text font-medium">
          Frontend / Fullstack Developer &middot; 4+ Years Experience
        </p>

        <p className="mt-6 text-gray-text leading-relaxed max-w-2xl mx-auto">
          Frontend-focused Fullstack Developer building large-scale enterprise
          platforms in{" "}
          <span className="text-dark font-medium">
            Fleet Management, Logistics, Fintech, and E-Commerce
          </span>
          . Strong expertise in the React ecosystem, real-time data systems, and
          map-based applications.
        </p>

        {/* Contact pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="tel:0830085804"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-text hover:bg-primary hover:text-white transition-all"
          >
            <PhoneIcon /> 083-008-5804
          </a>
          <a
            href="mailto:planpopx78@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-text hover:bg-primary hover:text-white transition-all"
          >
            <MailIcon /> planpopx78@gmail.com
          </a>
          <a
            href="https://github.com/Planos78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-text hover:bg-primary hover:text-white transition-all"
          >
            <GitHubIcon /> Planos78
          </a>
          <a
            href="https://linkedin.com/in/thikhamporn-o-siri-375b47198"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-text hover:bg-primary hover:text-white transition-all"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-text">
            <LocationIcon /> Bangkok, Thailand
          </span>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-blue-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-border rounded-lg font-medium text-dark hover:border-primary hover:text-primary transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-dark">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-text">{subtitle}</p>}
      <div className="mt-4 w-16 h-1 bg-primary mx-auto rounded-full" />
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-section-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies I work with daily"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="Where I've made an impact"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />

          <div className="sm:pl-10">
            {/* Company header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-dark">Freewill FX</h3>
                <p className="text-primary font-medium">
                  Frontend / Fullstack Developer
                </p>
              </div>
              <p className="text-gray-text text-sm mt-1 sm:mt-0">
                Jul 2021 – Present &middot; Bangkok, Thailand
              </p>
            </div>

            {/* Key projects badge */}
            <div className="mb-6 flex flex-wrap gap-2">
              {["Fleetlink", "CPAC GPS Center", "Terminus Fleet Platform"].map(
                (p) => (
                  <span
                    key={p}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold"
                  >
                    {p}
                  </span>
                )
              )}
            </div>

            {/* Items */}
            <ul className="space-y-4">
              {EXPERIENCE_ITEMS.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                  <span className="text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-section-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Notable Projects"
          subtitle="Real-world production systems I've built"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div
                className={`h-2 bg-gradient-to-r ${p.color}`}
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-2">{p.title}</h3>
                <p className="text-xs text-gray-text font-mono mb-3">
                  {p.tech}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Education & Awards" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
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
              </div>
              <div>
                <h3 className="font-bold text-dark">KMITL</h3>
                <p className="text-sm text-gray-text">2017 – 2021</p>
              </div>
            </div>
            <p className="text-dark font-medium">
              King Mongkut&apos;s Institute of Technology Ladkrabang
            </p>
            <p className="text-gray-text text-sm mt-1">
              Bachelor of Engineering – Computer Engineering
            </p>
          </div>

          {/* Awards & Languages */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-dark mb-3">Awards</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-amber-500">&#9733;</span> Mobile
                  Application D-Industry – 2nd Runner Up
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-amber-500">&#9733;</span> Robot Contest
                  KMITL 2017 – Top 10
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-dark mb-3">Languages</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Thai</span>
                  <span className="text-primary font-medium">Native</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">English</span>
                  <span className="text-primary font-medium">
                    Conversational
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-dark text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Let&apos;s Work Together</h2>
        <p className="mt-3 text-gray-400 max-w-lg mx-auto">
          I&apos;m open to new opportunities and interesting projects. Feel free
          to reach out!
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:planpopx78@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <MailIcon /> planpopx78@gmail.com
          </a>
          <a
            href="tel:0830085804"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <PhoneIcon /> 083-008-5804
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://github.com/Planos78"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com/in/thikhamporn-o-siri-375b47198"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>

        <p className="mt-16 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Thikhamporn O-Siri. Built with
          Next.js & TailwindCSS.
        </p>
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
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="About Me" subtitle="A brief introduction" />
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <p className="text-gray-600 leading-relaxed text-lg">
                Frontend-focused Fullstack Developer with{" "}
                <span className="text-dark font-semibold">
                  4+ years of experience
                </span>{" "}
                building large-scale enterprise platforms in Fleet Management,
                Logistics, Fintech, and E-Commerce domains. I specialize in the{" "}
                <span className="text-dark font-semibold">
                  React ecosystem
                </span>
                , real-time data systems (
                <span className="text-dark font-semibold">
                  MQTT/WebSocket
                </span>
                ), and map-based applications (
                <span className="text-dark font-semibold">
                  Google Maps, Longdo Map
                </span>
                ). Proven ability to handle complex production systems at scale
                (50,000+ vehicles), debug critical issues, and deliver clean,
                high-performance interfaces in fast-paced cross-functional
                teams.
              </p>
            </div>
          </div>
        </section>
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
