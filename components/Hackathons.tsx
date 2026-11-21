import { Calendar, Cpu, Medal, Trophy } from "lucide-react";
import { EventGallery } from "./EventGallery";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { TagList } from "./ui/Tag";
import { featuredHackathons, otherHackathons, type Hackathon } from "@/lib/data";
import { getEventPhotos } from "@/lib/photos";

const tone = {
  gold: {
    badge: "border-gold/30 bg-gold/10 text-amber-200",
    glow: "bg-gold/10",
    Icon: Medal,
  },
  silver: {
    badge: "border-silver/30 bg-silver/10 text-slate-200",
    glow: "bg-accent/15",
    Icon: Trophy,
  },
} as const;

export function Hackathons() {
  return (
    <Section id="hackathons">
      <SectionHeading
        index="03"
        eyebrow="Hackathons & Awards"
        title="Built under pressure, recognized nationally."
        description="Two national awards for AI that serves the public — from evidence analysis for the Cyber Police to safer crosswalks."
      />

      <div className="space-y-8">
        {featuredHackathons.map((h, i) => (
          <FeaturedHackathon key={h.slug} hackathon={h} reversed={i % 2 === 1} />
        ))}
      </div>

      {otherHackathons.length > 0 && (
        <div className="mt-8 grid gap-4">
          {otherHackathons.map((h) => (
            <Reveal key={h.project} className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-7 md:flex-row md:items-start md:gap-8">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-accent">
                <Cpu className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-fg-strong">
                    {h.project}
                    <span className="font-normal text-muted"> · {h.event}</span>
                  </h3>
                  <p className="font-mono text-xs text-subtle">{h.period}</p>
                </div>
                <p className="mt-1 text-sm text-subtle">{h.role}</p>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{h.description}</p>
                <div className="mt-4">
                  <TagList tags={h.tags} label={`Technologies used in ${h.project}`} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

function FeaturedHackathon({ hackathon: h, reversed }: { hackathon: Hackathon; reversed: boolean }) {
  const photos = getEventPhotos(h.photoDir, h.event);
  const t = tone[h.awardTone];

  return (
    <Reveal as="article" className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10">
      <div aria-hidden className={`absolute -top-24 ${reversed ? "-left-24" : "-right-24"} h-64 w-64 rounded-full blur-[90px] ${t.glow}`} />

      <div className={`relative grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${t.badge}`}>
            <t.Icon className="size-3.5" aria-hidden />
            {h.award}
          </p>

          <h3 className="mt-5 text-sm font-medium text-muted">{h.event}</h3>
          <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
            <Calendar className="size-3" aria-hidden />
            {h.period}
          </p>

          <p className="mt-6 text-3xl font-semibold tracking-tight text-fg-strong sm:text-4xl">{h.project}</p>
          <p className="mt-1 text-lg text-fg">{h.projectSummary}</p>
          <p className="mt-4 leading-relaxed text-muted text-pretty">{h.description}</p>

          <div className="mt-6 flex items-baseline gap-3 border-l-2 border-cyan/60 pl-4">
            <span className="text-3xl font-semibold tracking-tight text-fg-strong tabular-nums">{h.metric.value}</span>
            <span className="text-sm text-muted">{h.metric.label}</span>
          </div>

          <div className="mt-6">
            <TagList tags={h.tags} label={`Focus areas of ${h.project}`} />
          </div>
        </div>

        <EventGallery photos={photos} eventName={h.event} photoDir={h.photoDir} />
      </div>
    </Reveal>
  );
}
