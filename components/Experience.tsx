import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { TagList } from "./ui/Tag";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Shipping AI and automation inside Thailand's largest enterprises."
        description="From RAG memory research to payment-gateway test automation — work that reaches thousands of people."
      />

      <ol className="relative">
        {/* Timeline rail */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent md:left-[calc(12rem+7px)]" />

        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.role}`} delay={i * 0.05} className="relative pb-14 pl-9 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
            {/* Period (left column on desktop) */}
            <div className="mb-3 md:mb-0 md:pt-1 md:pr-10 md:text-right">
              <p className="font-mono text-xs text-subtle">{job.period}</p>
              {job.current && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
                  Current
                </span>
              )}
            </div>

            {/* Dot */}
            <span
              aria-hidden
              className={`absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border md:left-[12rem] ${
                job.current ? "border-cyan/60 bg-bg" : "border-line-strong bg-bg"
              }`}
            >
              <span className={`size-[5px] rounded-full ${job.current ? "bg-cyan" : "bg-subtle"}`} />
            </span>

            <article className="md:pl-10">
              <div className="flex items-center gap-4">
                {job.logo && (
                  <span
                    className={`flex h-11 w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-white/10 ${job.logo.tileClass}`}
                  >
                    {/* Decorative: the company name is in the heading right beside it */}
                    <Image src={job.logo.src} alt="" sizes="88px" className="h-full w-full object-contain" />
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight text-fg-strong">
                    {job.role}
                    <span className="text-muted"> · {job.company}</span>
                  </h3>
                  {job.companyFull && <p className="mt-1 text-sm text-subtle">{job.companyFull}</p>}
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {job.highlights.map((h) => (
                  <li key={h} className="relative pl-5 leading-relaxed text-muted text-pretty">
                    <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent/70" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <TagList tags={job.tags} label={`Technologies used at ${job.company} as ${job.role}`} />
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
