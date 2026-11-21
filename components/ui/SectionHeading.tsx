import { Reveal } from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-cyan uppercase">
        <span className="text-subtle">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      {/* Title wrapped in JSX-fragment tags for the code-editor look. The tags are decorative (aria-hidden);
          the non-breaking spaces keep each tag glued to its neighbouring word so a tag never wraps onto a line alone. */}
      <h2 className="text-3xl font-semibold tracking-tight text-fg-strong text-balance sm:text-4xl">
        <span aria-hidden className="font-mono text-[0.8em] font-normal tracking-normal text-accent/70 select-none">
          &lt;&gt;
        </span>
        {" "}
        {title}
        {" "}
        <span aria-hidden className="font-mono text-[0.8em] font-normal tracking-normal text-accent/70 select-none">
          &lt;/&gt;
        </span>
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{description}</p>}
    </Reveal>
  );
}
