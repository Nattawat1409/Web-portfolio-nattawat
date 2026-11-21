import {
  ClipboardCheck,
  Database,
  DatabaseZap,
  Drama,
  FileSearch,
  FlaskConical,
  Gauge,
  ListChecks,
  TableProperties,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import {
  siDocker,
  siFastapi,
  siGit,
  siGooglecloud,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRobotframework,
  siTypescript,
  siVercel,
  siVllm,
  type SimpleIcon,
} from "simple-icons";
import type { skillGroups } from "@/lib/data";

/**
 * Logo for every skill in lib/data.ts → skillGroups.
 * Brand marks come from Simple Icons (CC0). Tools without a published mark, and concepts like
 * "RAG" or "Test Design", use a Lucide outline icon instead.
 * Typed against skillGroups, so adding a skill without an icon here is a build error.
 */
type SkillName = (typeof skillGroups)[number]["items"][number];
type TechIcon = { brand: SimpleIcon } | { Icon: LucideIcon };

export const techIcons: Record<SkillName, TechIcon> = {
  // AI & LLM Systems
  LangChain: { brand: siLangchain },
  LangGraph: { brand: siLanggraph },
  RAG: { Icon: FileSearch },
  MCP: { brand: siModelcontextprotocol },
  Pinecone: { Icon: DatabaseZap },
  DeepEval: { Icon: FlaskConical },
  vLLM: { brand: siVllm },
  "Text-to-SQL": { Icon: TableProperties },
  // Backend & Data
  Python: { brand: siPython },
  SQL: { Icon: Database },
  FastAPI: { brand: siFastapi },
  "Node.js": { brand: siNodedotjs },
  "REST APIs": { Icon: Webhook },
  PostgreSQL: { brand: siPostgresql },
  MongoDB: { brand: siMongodb },
  // Frontend & Cloud
  TypeScript: { brand: siTypescript },
  React: { brand: siReact },
  "Google Cloud Platform": { brand: siGooglecloud },
  Docker: { brand: siDocker },
  Git: { brand: siGit },
  Vercel: { brand: siVercel },
  // Quality & Testing
  "Robot Framework": { brand: siRobotframework },
  Playwright: { Icon: Drama },
  "Test Design": { Icon: ListChecks },
  "Performance Testing": { Icon: Gauge },
  "LLM Evaluation": { Icon: ClipboardCheck },
};

const FALLBACK_HOVER = "#22d3ee"; // cyan accent for non-brand icons
const LIGHT = "#f8fafc";

/** Brand color for hover — very dark brand colors (e.g. Vercel's black) would vanish on the dark site, so use white. */
function hoverColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.06 ? LIGHT : `#${hex}`;
}

/** Monochrome logo that takes its brand color when the parent `group/chip` is hovered. */
export function TechLogo({ name }: { name: SkillName }) {
  const icon = techIcons[name];
  const color = "brand" in icon ? hoverColor(icon.brand.hex) : FALLBACK_HOVER;
  const className =
    "size-4 shrink-0 text-muted transition-colors duration-300 group-hover/chip:text-[var(--brand)]";

  return (
    <span aria-hidden className="contents" style={{ "--brand": color } as React.CSSProperties}>
      {"brand" in icon ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d={icon.brand.path} />
        </svg>
      ) : (
        <icon.Icon className={className} strokeWidth={1.75} />
      )}
    </span>
  );
}
