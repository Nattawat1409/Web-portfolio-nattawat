import Image from "next/image";
import { HeartHandshake } from "lucide-react";
// Small web copy of images/KMUTT_Logo.png (the original is 8522×9633 — far too big to ship)
import kmuttLogo from "@/images/kmutt-logo.png";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { TagList } from "./ui/Tag";
import { about, activities, education } from "@/lib/data";

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" title="Engineer first, measured by outcomes." />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted text-pretty">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="w-28 shrink-0 font-mono text-xs tracking-wider text-subtle uppercase">{f.label}</dt>
                <dd className="text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.1} className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-start gap-4">
              {/* KMUTT mark on its own brand orange so the logo's background blends into the tile.
                  Decorative: the university name is the heading right beside it. */}
              <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#e64011] ring-1 ring-white/10">
                <Image src={kmuttLogo} alt="" sizes="48px" className="h-full w-auto" />
              </span>
              <div className="min-w-0">
                <h3 className="font-medium text-fg-strong">{education.school}</h3>
                <p className="mt-1 text-sm text-muted">{education.degree}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-subtle">
                  <span>{education.period}</span>
                  <span>
                    GPA <span className="text-fg">{education.gpa}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-3 font-mono text-[11px] tracking-wider text-subtle uppercase">Relevant coursework</p>
              <TagList tags={education.coursework} label="Relevant coursework" />
            </div>
          </Reveal>

          <Reveal delay={0.18} className="glass rounded-2xl p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <HeartHandshake className="size-4 text-accent" aria-hidden />
              <h3 className="font-mono text-[11px] tracking-wider text-subtle uppercase">Activities</h3>
            </div>
            <ul className="space-y-4">
              {activities.map((a) => (
                <li key={a.title}>
                  <p className="text-sm font-medium text-fg">{a.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{a.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
