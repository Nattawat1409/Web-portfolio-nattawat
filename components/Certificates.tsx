import { ArrowUpRight, BadgeCheck, FolderOpen } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { certificates, profile } from "@/lib/data";

export function Certificates() {
  return (
    <Section id="certificates">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          index="05"
          eyebrow="Certificates"
          title="Continuous learning, verified."
        />
        <Reveal className="mb-12 md:mb-16">
          <a
            href={profile.links.certificates}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong hover:text-fg-strong"
          >
            <FolderOpen className="size-4 text-cyan" aria-hidden />
            Access all certificates
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            <span className="sr-only">(Google Drive, opens in new tab)</span>
          </a>
        </Reveal>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 3) * 0.06}>
            <a
              href={profile.links.certificates}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-accent/35"
            >
              <div className="flex items-start justify-between gap-4">
                <BadgeCheck className="size-5 text-accent" aria-hidden />
                <ArrowUpRight className="size-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-strong" aria-hidden />
              </div>
              <h3 className="mt-6 font-medium leading-snug text-fg-strong text-pretty">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.issuer}</p>
              <span className="sr-only">(view certificate on Google Drive, opens in new tab)</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
