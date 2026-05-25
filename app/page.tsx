"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import GitHubStats from "./components/GitHubStats";

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setCompleted(true);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  if (completed) return <span style={{ color: "#e6edf7" }}>{text}</span>;
  return <span style={{ color: "#e6edf7" }}>{displayed}</span>;
}

const personalInfo = {
  name: "Muhammad-Faizan",
  role: "Full-stack Developer",
  location: "Lahore, Pakistan",
  email: "un6902090@gmail.com",
  status: "Open for Remote Engineering Roles",
};

const techStack = {
  frontend: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"],
};

const skillsData = [
  { name: "Next.js", category: "Frontend", usage: "Core", description: "Primary React framework" },
  { name: "React", category: "Frontend", usage: "Core", description: "Component-based UI" },
  { name: "TypeScript", category: "Frontend", usage: "Core", description: "Type-safe development" },
  { name: "Tailwind CSS", category: "Frontend", usage: "Production", description: "Utility-first styling" },
  { name: "Framer Motion", category: "Frontend", usage: "Production", description: "Animation library" },
  { name: "Node.js", category: "Backend", usage: "Core", description: "Runtime environment" },
  { name: "Express", category: "Backend", usage: "Production", description: "API development" },
  { name: "PostgreSQL", category: "Backend", usage: "Production", description: "Relational database" },
  { name: "MongoDB", category: "Backend", usage: "Frequent", description: "NoSQL database" },
  { name: "Prisma", category: "Backend", usage: "Frequent", description: "ORM for type safety" },
  { name: "Django", category: "Backend", usage: "Core", description: "Python web framework" },
  { name: "Django REST Framework", category: "Backend", usage: "Production", description: "REST API toolkit" },
  { name: "Git", category: "Tools", usage: "Core", description: "Version control" },
  { name: "Docker", category: "Tools", usage: "Exploring", description: "Containerization" },
  { name: "Vercel", category: "Tools", usage: "Production", description: "Deployment platform" },
  { name: "Linux", category: "Tools", usage: "Frequent", description: "Server management" },
  { name: "Figma", category: "Tools", usage: "Exploring", description: "UI design tool" },
];

const projects = [
  {
    name: "Todo Manager",
    category: "Full-Stack Application",
    description:
      "Built with Django as a first deep dive into the Python web ecosystem — features user authentication, a clean task dashboard, and a polished UI for managing daily todos.",
    impact: "User auth system · Responsive task dashboard",
    stack: ["Django", "SQLite", "Bootstrap"],
    stackColors: ["#092e20", "#003b57", "#7952b3"],
    liveUrl: "https://my-todo-app-70p5.onrender.com/todolist/",
    githubUrl: "https://github.com/FAIZAN-MAKER/Todo_Manager_Django",
  },
  {
    name: "3D Elite Portfolio",
    category: "Interactive Experience",
    description:
      "Designed and developed an immersive 3D portfolio featuring spatial navigation, dynamic lighting, and interactive skill visualization using WebGL.",
    impact: "Custom WebGL shaders · Spatial camera controls",
    stack: ["Three.js", "React Three Fiber"],
    stackColors: ["#049ef4", "#61dafb"],
    liveUrl: "https://aetheria-dejm.vercel.app/",
    githubUrl: "https://github.com/FAIZAN-MAKER/Aetheria",
  },
  {
    name: "Todo Manager 2",
    category: "Full-Stack Application",
    description:
      "Built with Django REST Framework and React for a modern todo experience — my first project combining DRF with a React frontend, featuring user authentication and a responsive task dashboard.",
    impact: "DRF + React integration · JWT auth",
    stack: ["React", "Django REST Framework", "Tailwind CSS"],
    stackColors: ["#61dafb", "#092e20", "#06b6d4"],
    liveUrl: "https://todomanagerrr.netlify.app/",
    githubUrl: "https://github.com/FAIZAN-MAKER/todo_manager_2",
  },
];

const philosophy = [
  { label: "Methodology", value: "Build-to-learn. Complex, production-grade projects over basic tutorials." },
  { label: "Design", value: "Dark mode, minimalist aesthetics, smooth motion-based interfaces." },
  { label: "Code Style", value: "Strict TypeScript, clean architecture, zero compromise." },
];

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`;

const INTRO_LINES: { text: string; font: string; size: string; weight: number; tracking?: string; color: string }[] = [
  {
    text: "Muhammad Faizan",
    font: "Unbounded, sans-serif",
    size: "clamp(2rem, 6vw, 5.5rem)",
    weight: 800,
    tracking: "-0.04em",
    color: "#f5f5f5",
  },
  {
    text: "Full-Stack Engineer",
    font: "Unbounded, sans-serif",
    size: "clamp(1.4rem, 4vw, 3.2rem)",
    weight: 400,
    tracking: "0.01em",
    color: "#a3a3a3",
  },
  {
    text: "Production-grade web applications.",
    font: "DM Mono, monospace",
    size: "clamp(0.75rem, 1.8vw, 1.1rem)",
    weight: 400,
    tracking: "0.1em",
    color: "rgba(245, 245, 245, 0.5)",
  },
];

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#e6edf7">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.78 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e6edf7">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-3.35c1.32.28 2.72.42 4.12.42 1.4 0 2.8-.14 4.12-.42 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.57C20.56 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

interface Skill {
  name: string;
  category: string;
  usage: string;
  description: string;
}

const columnHelper = createColumnHelper<Skill>();

function SkillTable({ data }: { data: Skill[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const columns = [
    columnHelper.accessor("name", {
      header: "Skill",
      cell: ({ row }) => (
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, fontWeight: 500, color: "#e6edf7" }}>
          {row.original.name}
        </span>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ getValue }) => (
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("usage", {
      header: "Usage",
      cell: ({ getValue }) => {
        const usage = getValue();
        const colors: Record<string, string> = {
          Core: "#7c3aed",
          Production: "#22c55e",
          Frequent: "#38bdf8",
          Exploring: "#f59e0b",
        };
        return (
          <span style={{
            fontFamily: "DM Mono, monospace", fontSize: 10, fontWeight: 600,
            color: colors[usage] || "#64748b",
            background: `${colors[usage] || "#64748b"}18`,
            padding: "4px 10px", borderRadius: 6,
          }}>
            {usage}
          </span>
        );
      },
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: ({ getValue }) => (
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#94a3b8" }}>
          {getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const categories = ["All", ...Array.from(new Set(data.map((s: Skill) => s.category)))];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat === "All" ? null : cat)}
            style={{
              fontFamily: "DM Mono, monospace", fontSize: 11, padding: "6px 14px",
              background: activeFilter === cat || (cat === "All" && !activeFilter) ? "#7c3aed" : "transparent",
              color: activeFilter === cat || (cat === "All" && !activeFilter) ? "#fff" : "#94a3b8",
              border: "none", borderRadius: 6, cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ background: "#111a2e", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(148,163,184,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      textAlign: "left", padding: "14px 18px",
                      fontFamily: "DM Mono, monospace", fontSize: 10, fontWeight: 600,
                      color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase",
                      cursor: "pointer", userSelect: "none",
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows
              .filter((row) => !activeFilter || row.original.category === activeFilter)
              .map((row) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: "1px solid rgba(148,163,184,0.04)",
                    background: hoveredRow === row.id ? "rgba(124,58,237,0.04)" : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: "16px 18px" }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IntroLine({
  line,
  isVisible,
  delay,
  phase,
}: {
  line: typeof INTRO_LINES[0];
  isVisible: boolean;
  delay: number;
  phase: "intro" | "exit";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={isVisible ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(10px)", y: -10 }}
      transition={{ duration: 0.6, delay: isVisible ? delay : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        fontFamily: line.font,
        fontSize: line.size,
        fontWeight: line.weight,
        letterSpacing: line.tracking ?? "normal",
        color: line.color,
        lineHeight: 1.1,
        textAlign: "center",
        position: "relative",
      }}
    >
      <motion.span
        animate={{ opacity: phase === "exit" ? 0 : isVisible ? 1 : 0, scale: phase === "exit" ? 0.95 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {phase === "exit" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              position: "absolute", top: "50%", left: "-20%", width: "140%", height: "200%",
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.15), transparent)",
              transform: "translateY(-50%) rotate(2deg)",
            }}
          />
        )}
        {line.text}
      </motion.span>
    </motion.div>
  );
}

// ─── CINEMATIC PRELOADER ───────────────────────────────────────────────────────
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "exit">("in");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 2200);
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(() => onComplete(), 3300);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const fullName = "Muhammad Faizan";

  return (
    <motion.div
      key="preloader"
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0b1220",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
          opacity: 0.3,
        }}
      />

      {/* Scanline sweep */}
      <motion.div
        initial={{ top: "15%", opacity: 0 }}
        animate={{ top: "85%", opacity: [0, 1, 0.6, 0] }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Light sweep */}
      <motion.div
        initial={{ left: "-100%", opacity: 0 }}
        animate={{ left: "160%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        style={{
          position: "absolute", top: 0, width: "60%", height: "100%",
          background: "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.06) 40%, rgba(167,139,250,0.12) 50%, rgba(167,139,250,0.06) 60%, transparent 100%)",
          transform: "skewX(-15deg)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, height: 200,
          background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Name + subtitle */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        {/* Letters */}
        <div style={{ display: "flex", alignItems: "baseline", overflow: "hidden", height: "clamp(56px, 9vw, 90px)" }}>
          {fullName.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.35 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "Unbounded, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 800,
                color: "#e6edf7",
                letterSpacing: "-0.03em",
                display: "inline-block",
                minWidth: char === " " ? "0.35em" : "auto",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}
        >
          <div style={{ width: 28, height: 1, background: "rgba(124,58,237,0.5)" }} />
          <span style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.72rem",
            color: "#64748b",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Full Stack Developer
          </span>
          <div style={{ width: 28, height: 1, background: "rgba(124,58,237,0.5)" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

function TechStackVisual({ stack, colors }: { stack: string[]; colors: string[] }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {stack.map((tech, i) => (
          <motion.div
            key={tech}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 280 }}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${colors[i] || "rgba(148,163,184,0.15)"}`,
              background: "#111a2e",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i] || "#64748b" }} />
            <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "DM Mono, monospace" }}>{tech}</span>
          </motion.div>
        ))}
      </div>
      <span style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Mono, monospace" }}>
        Tech Stack
      </span>
    </div>
  );
}

function EmailCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <a
        href={`mailto:${email}`}
        style={{ display: "flex", alignItems: "center", gap: 10, color: "#94a3b8", textDecoration: "none", fontFamily: "DM Mono, monospace", fontSize: 13 }}
      >
        <MailIcon />
        {email}
      </a>
      <div style={{ position: "relative" }} onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.85 }}
          whileHover={{ backgroundColor: "#162238" }}
          style={{ padding: "5px 7px", background: "transparent", border: "1px solid rgba(148,163,184,0.12)", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.button>
        {showTip && !copied && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
              background: "#162238", color: "#e6edf7", fontSize: 11, padding: "4px 10px",
              borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none", fontFamily: "DM Mono, monospace",
            }}
          >
            Copy email
            <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderWidth: 4, borderStyle: "solid", borderColor: "#162238 transparent transparent transparent" }} />
          </motion.div>
        )}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
              background: "#22c55e", color: "#0b1220", fontSize: 11, padding: "4px 10px",
              borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none", fontFamily: "DM Mono, monospace",
            }}
          >
            Copied!
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface Project {
  name: string;
  category: string;
  description: string;
  impact: string;
  stack: string[];
  stackColors: string[];
  liveUrl?: string;
  githubUrl?: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#111a2e",
        padding: "32px 32px 28px",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(124,58,237,0.12), 0 0 0 1px rgba(124,58,237,0.1)" : "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s",
        }}
      />

      <div style={{ marginBottom: 16 }}>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
          {project.category}
        </span>
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#e6edf7", letterSpacing: "-0.025em", fontFamily: "Unbounded, sans-serif", marginBottom: 12, lineHeight: 1.3 }}>
        {project.name}
      </h3>

      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, fontFamily: "DM Mono, monospace", marginBottom: 20 }}>
        {project.description}
      </p>

      <div style={{ padding: "12px 0", borderTop: "1px solid rgba(148,163,184,0.06)", marginBottom: 16 }}>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#64748b", letterSpacing: "0.02em" }}>
          {project.impact}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {project.stack.map((tech) => (
          <span key={tech} style={{ padding: "5px 10px", background: "rgba(148,163,184,0.06)", color: "#94a3b8", fontSize: 11, fontFamily: "DM Mono, monospace", borderRadius: 4 }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: hovered ? 1 : 0.5, transition: "opacity 0.25s ease" }}>
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500, color: "#a78bfa", textDecoration: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        )}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500, color: "#94a3b8", textDecoration: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const heroChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const avatarVariant = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, delay: 0.25, type: "spring", stiffness: 180 } },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [projectPage, setProjectPage] = useState(0);
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-80px" });

  const PROJECTS_PER_PAGE = 2;
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = projects.slice(projectPage * PROJECTS_PER_PAGE, (projectPage + 1) * PROJECTS_PER_PAGE);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => setShowContent(true), 50);
  };

  const CONTAINER: React.CSSProperties = {
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
    paddingLeft: 48,
    paddingRight: 48,
  };

  const SECTION_BASE = { paddingTop: 140, paddingBottom: 140 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }
        html { scroll-behavior: smooth }
        body { background: #0b1220; margin: 0; overflow-x: hidden; font-family: 'DM Mono', monospace; max-width: 100vw }
        a { text-decoration: none }
        h1, h2, h3 { font-family: 'Unbounded', sans-serif }
        @media (max-width: 768px) {
          .site-container { padding-left: 20px !important; padding-right: 20px !important }
          .projects-grid { grid-template-columns: 1fr !important }
          .hero-grid { grid-template-columns: 1fr !important }
          .hero-content { text-align: center !important; align-items: center !important }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important }
          .footer-content { text-align: center !important }
          .skills-table { display: flex !important; flex-direction: column !important }
          .skills-table thead { display: none !important }
          .skills-table tbody tr { display: flex !important; flex-direction: column !important; padding: 16px !important; margin-bottom: 12px !important; background: #111a2e !important; border-radius: 10px !important }
          .skills-table td { padding: 6px 0 !important; border: none !important }
          .skill-row-card { display: flex !important; flex-direction: column !important; gap: 8px !important }
          .cta-buttons { flex-direction: column !important; width: 100% !important }
          .cta-buttons a { width: 100% !important; justify-content: center !important }
        }
      `}</style>

      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "relative", minHeight: "100vh", background: "#0b1220" }}
      >
        {/* Grid background */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Grain background */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "multiply",
          opacity: 0.15,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── HERO ── */}
          <section style={{ ...SECTION_BASE, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 600, background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />

            <div style={CONTAINER} className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hero-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
              >
                <div style={{ minWidth: 0 }} className="hero-content">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={showContent ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                      display: "inline-block",
                      background: "rgba(124, 58, 237, 0.12)",
                      border: "1px solid rgba(124, 58, 237, 0.25)",
                      color: "#a78bfa",
                      fontFamily: "DM Mono, monospace",
                      fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                      padding: "5px 12px", textTransform: "uppercase", marginBottom: 24,
                    }}
                  >
                    Available for Work
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      fontFamily: "Unbounded, sans-serif",
                      fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                      fontWeight: 800, color: "#e6edf7", lineHeight: 1.1,
                      letterSpacing: "-0.03em", marginBottom: 20,
                    }}
                  >
                    Engineering products that{" "}
                    <span style={{ color: "#a78bfa", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      scale
                    </span>.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      fontFamily: "DM Mono, monospace",
                      fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                      color: "#94a3b8", lineHeight: 1.7, marginBottom: 32, maxWidth: 440,
                    }}
                  >
                    Full-stack engineer focused on performance, clean architecture, and real-world impact. I help startups ship products that handle production traffic.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="cta-buttons"
                    style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "flex-start" }}
                  >
                    <motion.a
                      href={`mailto:${personalInfo.email}`}
                      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(124,58,237,0.35)" }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "12px 24px", background: "#7c3aed", color: "#f5f5f5",
                        fontFamily: "DM Mono, monospace", fontSize: 13, fontWeight: 500,
                        textDecoration: "none", borderRadius: 8,
                      }}
                    >
                      <MailIcon />
                      Get in Touch
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/muhammad-faizan-1a9917392/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, borderColor: "rgba(56, 189, 248, 0.4)", backgroundColor: "#162238" }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        padding: "12px 24px", background: "transparent", color: "#e6edf7",
                        fontFamily: "DM Mono, monospace", fontSize: 13, fontWeight: 500,
                        textDecoration: "none", border: "2px solid rgba(148, 163, 184, 0.15)", borderRadius: 8,
                      }}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </motion.a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={showContent ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 36 }}
                  >
                    <MapPinIcon />
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#64748b" }}>
                      {personalInfo.location}
                    </span>
                  </motion.div>
                </div>

                {/* Avatar */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={showContent ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)", filter: "blur(40px)", transform: "translate(-20%, -20%)" }} />
                  <div style={{ position: "relative", width: 220, height: 220, borderRadius: "50%", border: "3px solid rgba(124, 58, 237, 0.3)", overflow: "hidden", background: "#111a2e", boxShadow: "0 0 80px rgba(124, 58, 237, 0.2), 0 0 120px rgba(124, 58, 237, 0.1)" }}>
                    <Image src="/Me.jpeg" alt={personalInfo.name} width={240} height={240} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section style={{ ...SECTION_BASE, paddingTop: 60 }}>
            <div style={CONTAINER} className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}
              >
                <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 13, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                  About
                </h2>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(1rem, 1.6vw, 1.1rem)", color: "#cbd5e1", lineHeight: 1.8, marginBottom: 20 }}>
                  {personalInfo.name} — {personalInfo.role}
                </p>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(0.95rem, 1.5vw, 1rem)", color: "#94a3b8", lineHeight: 1.8 }}>
                  I build production-grade web applications that handle real traffic. From clean architecture to performance optimization, I help startups and growing teams ship products that scale. Currently based in {personalInfo.location}.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section style={{ ...SECTION_BASE, paddingTop: 60 }}>
            <div style={CONTAINER} className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf7", letterSpacing: "-0.03em", marginBottom: 40, textAlign: "center" }}>
                  Skills
                </h2>
                <div className="skills-table">
                  <SkillTable data={skillsData} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section style={{ ...SECTION_BASE, paddingTop: 60 }}>
            <div style={CONTAINER} className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                  <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 28, fontWeight: 800, color: "#e6edf7", letterSpacing: "-0.03em" }}>
                    Projects
                  </h2>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#64748b" }}>
                    {projects.length} works
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="projects-grid">
                  {paginatedProjects.map((project, i) => (
                    <ProjectCard key={project.name} project={project} index={i} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>
                    <motion.button
                      onClick={() => setProjectPage((p) => Math.max(0, p - 1))}
                      disabled={projectPage === 0}
                      whileHover={projectPage > 0 ? { x: -2 } : {}}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px", background: projectPage === 0 ? "transparent" : "rgba(124,58,237,0.12)",
                        color: projectPage === 0 ? "#475569" : "#a78bfa",
                        fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500,
                        border: `1px solid ${projectPage === 0 ? "rgba(71,85,105,0.2)" : "rgba(124,58,237,0.25)"}`,
                        borderRadius: 8, cursor: projectPage === 0 ? "not-allowed" : "pointer",
                        opacity: projectPage === 0 ? 0.4 : 1, transition: "all 0.2s",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </motion.button>
                    <div style={{ display: "flex", gap: 8 }}>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setProjectPage(i)}
                          whileHover={{ scale: 1.1 }}
                          style={{
                            width: 32, height: 32, borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 600,
                            background: i === projectPage ? "#7c3aed" : "rgba(148,163,184,0.06)",
                            color: i === projectPage ? "#f5f5f5" : "#94a3b8",
                            border: "none", cursor: "pointer", transition: "all 0.2s",
                          }}
                        >
                          {i + 1}
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => setProjectPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={projectPage === totalPages - 1}
                      whileHover={projectPage < totalPages - 1 ? { x: 2 } : {}}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px", background: projectPage === totalPages - 1 ? "transparent" : "rgba(124,58,237,0.12)",
                        color: projectPage === totalPages - 1 ? "#475569" : "#a78bfa",
                        fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500,
                        border: `1px solid ${projectPage === totalPages - 1 ? "rgba(71,85,105,0.2)" : "rgba(124,58,237,0.25)"}`,
                        borderRadius: 8, cursor: projectPage === totalPages - 1 ? "not-allowed" : "pointer",
                        opacity: projectPage === totalPages - 1 ? 0.4 : 1, transition: "all 0.2s",
                      }}
                    >
                      Next
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          <GitHubStats />

          {/* ── FOOTER ── */}
          <footer style={{ paddingTop: 80, paddingBottom: 48 }}>
            <div style={CONTAINER} className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="footer-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}
              >
                <div style={{ textAlign: "left" }} className="footer-content">
                  <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#e6edf7", letterSpacing: "-0.02em", marginBottom: 12 }}>
                    Let's build something impactful.
                  </h3>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: "#94a3b8", marginBottom: 24, lineHeight: 1.6 }}>
                    I'm always open to discussing new projects and opportunities.
                  </p>
                  <motion.a
                    href={`mailto:${personalInfo.email}`}
                    whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(124,58,237,0.35)" }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "14px 28px", background: "#7c3aed", color: "#f5f5f5",
                      fontFamily: "DM Mono, monospace", fontSize: 14, fontWeight: 500,
                      textDecoration: "none", borderRadius: 8,
                    }}
                  >
                    <MailIcon />
                    Get in touch
                  </motion.a>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { href: "https://github.com/FAIZAN-MAKER", icon: <GitHubIcon /> },
                    { href: "https://www.linkedin.com/in/muhammad-faizan-1a9917392/", icon: <LinkedInIcon /> },
                    { href: `mailto:${personalInfo.email}`, icon: <MailIcon /> },
                  ].map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 48, height: 48, color: "#94a3b8", borderRadius: 10,
                        background: "rgba(148,163,184,0.05)",
                      }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid rgba(148,163,184,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#64748b" }}>
                  © 2025 Muhammad Faizan · {personalInfo.location}
                </p>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#64748b" }}>
                  Built with Next.js
                </p>
              </div>
            </div>
          </footer>

        </div>
      </motion.div>
    </>
  );
}