"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { TypedLine, useTypewriter, type TypeStep } from "./TypedLine";
import { PortraitCard } from "./PortraitCard";
import { heroMetrics, profile } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Terminal-style intro: `whoami` → name → role. Module-level so the array identity is stable.
const STEPS: TypeStep[] = [
  { text: "whoami", speed: 55, pauseAfter: 260 },
  { text: profile.name, speed: 38, pauseAfter: 140 },
  { text: profile.role, speed: 24 },
];

export function Hero() {
  const tw = useTypewriter(STEPS, 250);
  // Reveal the rest of the hero as soon as the name starts typing (~1s) — visitors never wait on the animation.
  const revealRest = tw.step >= 1;
  const line = (i: number) => ({
    typed: tw.typedAt(i),
    caret: tw.caretAt === i,
    blink: !tw.isTyping,
  });

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 md:pb-28">
      {/* Backdrop: engineering grid + two soft accent glows */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute top-[-12rem] left-1/2 -z-10 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent-strong/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-24 right-[-10rem] -z-10 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs text-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Currently <span className="text-fg">{profile.status}</span>
        </motion.p>

        {/* Portrait + terminal block: stacked on phones, side by side from md up */}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:gap-9 lg:gap-11">
          <PortraitCard />

          <div className="min-w-0">
            {/* Shell prompt — decorative */}
            <p aria-hidden className="flex flex-wrap items-baseline gap-x-2 font-mono text-sm sm:text-base">
              <span>
                <span className="text-cyan">nattawat@portfolio</span>
                <span className="text-subtle">:</span>
                <span className="text-accent">~</span>
                <span className="text-subtle">$</span>
              </span>
              <span className="text-fg">
                <TypedLine full={STEPS[0].text} {...line(0)} caretClassName="bg-fg" />
              </span>
            </p>

            {/* Real text for search engines & screen readers; the typed copy is aria-hidden */}
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-fg-strong text-balance sm:text-6xl md:text-7xl">
              <span className="sr-only">{profile.name}</span>
              <TypedLine full={profile.name} {...line(1)} />
            </h1>

            <p className="text-gradient mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
              <span className="sr-only">{profile.role}</span>
              <TypedLine full={profile.role} {...line(2)} caretClassName="bg-accent" />
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={revealRest ? "show" : "hidden"}
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-lg bg-fg-strong px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            View experience
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-line-strong hover:text-fg-strong"
          >
            Contact me
          </a>
          <span aria-hidden className="mx-1 hidden h-6 w-px bg-line-strong sm:block" />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg-strong"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg-strong"
          >
            <LinkedInIcon className="size-[18px]" />
          </a>
          <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-subtle">
            <MapPin className="size-3.5" aria-hidden />
            {profile.location}
          </span>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line md:mt-20 lg:grid-cols-4"
          style={{ gap: "1px" }}
        >
          {heroMetrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2 bg-bg/95 p-5 sm:p-6">
              <dt className="order-2 text-sm leading-snug text-muted text-pretty">{m.label}</dt>
              <dd className="order-1 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight text-fg-strong tabular-nums sm:text-4xl">
                  {m.value}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-subtle uppercase">{m.source}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
