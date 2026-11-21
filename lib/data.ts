/**
 * Single source of truth for every piece of content on the site.
 * Facts come from the resume (Resume_Nattawat_Ruensumrit.pdf). Edit here — components only render.
 */
import type { StaticImageData } from "next/image";
import scbLogo from "@/images/SCB_LOGO.jpg";
import scgLogo from "@/images/SCG_LOGO.png";

export const profile = {
  name: "Nattawat Ruensumrit",
  shortName: "Nattawat.R",
  role: "AI Engineer & Software Engineer",
  tagline:
    "I build production-grade AI systems — RAG pipelines, agent architectures and enterprise tools — and measure them by the work they take off people's plates.",
  status: "QA Automation Engineer at SCB",
  location: "Bangkok, Thailand",
  email: "nattawat140947@gmail.com",
  phone: "+66 95 385 6542",
  phoneHref: "tel:+66953856542",
  links: {
    github: "https://github.com/Nattawat1409",
    linkedin: "https://www.linkedin.com/in/nattawat-ruensumrit-8010a32a7/",
    certificates:
      "https://drive.google.com/drive/folders/1znC3RqSXY-HA4UGZTmZilzG4IjhKxZRM?usp=sharing",
    cv: "/Resume_Nattawat_Ruensumrit.pdf",
  },
} as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "hackathons", label: "Hackathons" },
  { id: "stack", label: "Stack" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

export const heroMetrics = [
  { value: "+55.6%", label: "cross-session recall from a redesigned RAG memory architecture", source: "SCG" },
  { value: "−15%", label: "agent latency after pruning unnecessary LangGraph nodes", source: "SCG" },
  { value: "10K+", label: "enterprise users on platforms I've built for", source: "SCB · SCG" },
  { value: "2×", label: "national awards — Cyber Warrior 1st Runner-Up & E-SAN Gold", source: "2025" },
] as const;

export const about = {
  paragraphs: [
    "I'm a Computer Engineering student at KMUTT who ships AI to production. At SCG I re-architected RAG memory and retrieval for an enterprise assistant; at SCB I built an internal platform for 10,000+ staff and now automate testing for the bank's payment gateway.",
    "I care about systems that can be measured — recall, latency, hallucination rate, hours saved — and about the people on the other end of them, from HR teams drowning in reports to cyber police officers buried in evidence.",
  ],
  facts: [
    { label: "Based in", value: "Bangkok, Thailand" },
    { label: "Studying", value: "B.Eng. Computer Engineering, KMUTT" },
    { label: "Languages", value: "Thai (native) · English (TOEIC 660)" },
  ],
} as const;

/** Company logo shown in a fixed-size tile. `tileClass` sets the tile background so each logo sits on its brand color. */
export type CompanyLogo = { src: StaticImageData; tileClass: string };

const logos = {
  // SCB's logo has its purple background baked in — match it so the tile edges blend seamlessly.
  scb: { src: scbLogo, tileClass: "bg-[#4e2a82]" },
  // SCG's logo is red on transparent — a white tile keeps it crisp on the dark site.
  scg: { src: scgLogo, tileClass: "bg-white p-1.5" },
} satisfies Record<string, CompanyLogo>;

export type Experience = {
  company: string;
  companyFull?: string;
  logo?: CompanyLogo;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "SCB",
    companyFull: "Siam Commercial Bank",
    logo: logos.scb,
    role: "QA Automation Engineer",
    period: "Sep 2026 — Present",
    current: true,
    highlights: [
      "Design test conditions and a coverage matrix for Project LEGO, the bank's payment gateway, covering multiple credit card types and payment methods.",
      "Automate performance, system-integration and black-box tests with Robot Framework, reducing manual and routine testing work by 60%.",
    ],
    tags: ["Robot Framework", "Test Design", "Performance Testing", "SIT", "Payments"],
  },
  {
    company: "SCG",
    companyFull: "The Siam Cement Public Company Limited",
    logo: logos.scg,
    role: "Data & AI Engineer Intern",
    period: "Jun 2026 — Sep 2026",
    highlights: [
      "Redesigned the RAG memory architecture for AI personalization — +55.6% cross-session recall and −3.5% wrong-memory recall vs. baseline, on a 400+ business-document corpus for a system designed for 10,000 enterprise users.",
      "Built Jumbo, a web interface that auto-generates PDF reports through a Text-to-SQL workflow, served via FastAPI in Docker — cutting the HR department's manual reporting work by ~70%.",
      "Optimized retrieval with contextual retrieval, benchmarked with DeepEval to reduce hallucination, and cut agent latency by ~15% by removing unnecessary LangGraph nodes.",
      "Shipped an MCP server exposing the agent knowledge base to internal AI systems, fed by a Bronze/Silver/Gold data pipeline.",
    ],
    tags: ["LangGraph", "LangChain", "RAG", "Pinecone", "MCP", "DeepEval", "Text-to-SQL", "FastAPI", "Docker", "GCP"],
  },
  {
    company: "SCB",
    companyFull: "Siam Commercial Bank",
    logo: logos.scb,
    role: "Power Apps Developer",
    period: "Feb 2026 — Mar 2026",
    highlights: [
      "Developed Thai Bank Museum, an internal Microsoft Power Apps platform for collecting, uploading and validating bank artifacts — reducing inspection time and streamlining workflows for 10,000+ internal users.",
    ],
    tags: ["Power Apps", "Workflow Automation", "Internal Tools"],
  },
];

export type Hackathon = {
  slug: string;
  event: string;
  award: string;
  awardTone: "silver" | "gold";
  period: string;
  project: string;
  projectSummary: string;
  description: string;
  metric: { value: string; label: string };
  tags: string[];
  /** Folder under /public/events/ — drop photos there and they appear automatically. */
  photoDir: string;
};

export const featuredHackathons: Hackathon[] = [
  {
    slug: "cyber-warrior-2025",
    event: "Cyber Warrior Hackathon 2025",
    award: "2nd Place · First Runner-Up",
    awardTone: "silver",
    period: "May 2025 — Jul 2025",
    project: "Sidekick",
    projectSummary: "AI assistant platform for the Cyber Police",
    description:
      "A prototype AI assistant that ingests suspect data in multiple file formats, analyzes digital evidence, links suspects and auto-generates case reports using NLP and graph technologies.",
    metric: { value: "~90%", label: "less redundant police workload" },
    tags: ["NLP", "Graph Technology", "Multi-format Ingestion", "Digital Evidence", "Report Generation"],
    photoDir: "cyber-warrior-2025",
  },
  {
    slug: "esan-pmub-s2",
    event: "E-SAN Thailand PMU-B Coding & AI Academy S2",
    award: "Social Impact Award · Gold Medal",
    awardTone: "gold",
    period: "Jan 2025 — Feb 2025",
    project: "Prompt-Dern",
    projectSummary: "Crosswalk safety application",
    description:
      "As part of the national winning team, built an AI-driven crosswalk safety app that helps prevent pedestrian–vehicle collisions on Thai roads.",
    metric: { value: "~50%", label: "lower accident rate" },
    tags: ["AI", "Social Impact", "Road Safety", "Team Project"],
    photoDir: "esan-pmub-s2",
  },
];

export const otherHackathons = [
  {
    event: "AMD Developer Hackathon 2026",
    role: "AI Engineer",
    period: "Apr 2026 — May 2026",
    project: "SENTRA",
    description:
      "Multi-agent predictive-maintenance system on an AMD Instinct MI300X GPU — three specialized LLM agents for anomaly detection, root-cause analysis and maintenance planning, served through a Streamlit dashboard.",
    tags: ["vLLM", "LangChain", "Multi-Agent", "AMD MI300X", "Streamlit"],
  },
] as const;

export const skillGroups = [
  {
    title: "AI & LLM Systems",
    icon: "brain",
    items: ["LangChain", "LangGraph", "RAG", "MCP", "Pinecone", "DeepEval", "vLLM", "Text-to-SQL"],
  },
  {
    title: "Backend & Data",
    icon: "server",
    items: ["Python", "SQL", "FastAPI", "Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Frontend & Cloud",
    icon: "layers",
    items: ["TypeScript", "React", "Google Cloud Platform", "Docker", "Git", "Vercel"],
  },
  {
    title: "Quality & Testing",
    icon: "shield",
    items: ["Robot Framework", "Playwright", "Test Design", "Performance Testing", "LLM Evaluation"],
  },
] as const;

export const softSkills = ["Critical Thinking", "Problem Solving", "Leadership", "Teamwork"] as const;

export const certificates = [
  {
    title: "Applied Data Engineering & AI Operations on Google Cloud",
    issuer: "BOI-STEM+ × Trainocate",
  },
  {
    title: "AMD AI Academy — Certificate of Completion",
    issuer: "AMD · LLM inference with vLLM on AMD Instinct MI300X",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM · Coursera",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google · Coursera",
  },
  {
    title: "CUBS BLOCKATHON: The Next Gen Business Innovation",
    issuer: "CU Innovation Hub",
  },
  {
    title: "E-SAN Thailand PMU-B Coding & AI Academy S2 — Gold Level",
    issuer: "PMU-B",
  },
] as const;

export const education = {
  school: "King Mongkut's University of Technology Thonburi (KMUTT)",
  degree: "Bachelor of Engineering in Computer Engineering (International Program)",
  period: "Aug 2023 — May 2027 (expected)",
  gpa: "3.41",
  coursework: [
    "Software Engineering",
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Applied Machine Learning",
    "Text Analytics",
    "Data Modeling",
    "UX/UI",
    "Computer Graphics",
  ],
} as const;

export const activities = [
  {
    title: "Volunteer Staff — ModCom CPE 2024",
    description: "Trained first-year CPE students and organized faculty events.",
  },
  {
    title: "Volunteer, Welfare Department — BangMod Hackathon 2025",
    description: "Supported provisions and care for competitors.",
  },
] as const;

export const contactSubjects = [
  "Full-time / AI Engineer role",
  "Internship or project collaboration",
  "AI / LLM consulting",
  "Speaking or community event",
  "Something else",
] as const;
