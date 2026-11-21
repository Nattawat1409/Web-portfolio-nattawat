import { Brain, Layers, Server, ShieldCheck, Users } from "lucide-react";
import { TechLogo } from "./techIcons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { skillGroups, softSkills } from "@/lib/data";

const icons = { brain: Brain, server: Server, layers: Layers, shield: ShieldCheck } as const;

export function TechStack() {
  return (
    <Section id="stack">
      <SectionHeading
        index="04"
        eyebrow="Tech Stack"
        title="Tools I reach for in production."
        description="Centered on LLM systems, backed by solid backend, cloud and testing fundamentals."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon];
          return (
            <Reveal
              key={g.title}
              delay={i * 0.06}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-accent/35 sm:p-7"
            >
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/15" />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <h3 className="font-medium text-fg-strong">{g.title}</h3>
              </div>
              <ul className="relative flex flex-wrap gap-2" aria-label={g.title}>
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="group/chip flex items-center gap-2 rounded-lg border border-line bg-bg/60 py-1.5 pr-3 pl-2.5 text-sm text-fg transition-colors hover:border-line-strong hover:text-fg-strong"
                  >
                    <TechLogo name={s} />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-4 flex flex-col gap-4 rounded-2xl border border-line px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
        <p className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-fg-strong">
          <Users className="size-4 text-accent" aria-hidden />
          Soft skills
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Soft skills">
          {softSkills.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-subtle" />
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
