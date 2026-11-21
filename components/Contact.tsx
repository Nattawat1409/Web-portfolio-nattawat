"use client";

import { Check, ChevronDown, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { contactSubjects, profile } from "@/lib/data";

const inputClass =
  "w-full rounded-lg border border-line bg-bg/70 px-3.5 py-3 text-[15px] text-fg-strong placeholder:text-subtle transition-colors outline-none hover:border-line-strong focus:border-cyan/60 focus:ring-2 focus:ring-cyan/15";

export function Contact() {
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      toast.success("Message sent", { description: "Thanks for reaching out — I'll reply soon." });
      form.reset();
    } catch (err) {
      toast.error("Couldn't send your message", {
        description: err instanceof Error ? err.message : "Please try again.",
        action: { label: "Email instead", onClick: () => (window.location.href = `mailto:${profile.email}`) },
      });
    } finally {
      setSending(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <Section id="contact" className="pb-16 md:pb-20">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-accent-strong/10 blur-[120px]" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Let's build something exceptional together."
            description="Open for AI Engineer roles, enterprise LLM consulting and high-impact collaborations."
          />

          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              <li className="flex items-center justify-between gap-4 py-4">
                <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3 text-fg transition-colors hover:text-fg-strong">
                  <Mail className="size-4 shrink-0 text-cyan" aria-hidden />
                  <span className="truncate">{profile.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:text-fg-strong"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </li>
              <li className="py-4">
                <a href={profile.phoneHref} className="flex items-center gap-3 text-fg transition-colors hover:text-fg-strong">
                  <Phone className="size-4 text-cyan" aria-hidden />
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 py-4 text-fg">
                <MapPin className="size-4 text-cyan" aria-hidden />
                {profile.location}
              </li>
            </ul>

            <div className="mt-6 flex gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong hover:text-fg-strong"
              >
                <GitHubIcon /> GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-fg transition-colors hover:border-line-strong hover:text-fg-strong"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <form onSubmit={onSubmit} className="glass space-y-5 rounded-3xl p-6 sm:p-8" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="name">
                <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={inputClass} />
              </Field>
              <Field label="Email address" htmlFor="email">
                <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" className={inputClass} />
              </Field>
            </div>

            <Field label="Subject / project type" htmlFor="subject">
              <div className="relative">
                <select id="subject" name="subject" required defaultValue="" className={`${inputClass} appearance-none pr-10 invalid:text-subtle`}>
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {contactSubjects.map((s) => (
                    <option key={s} value={s} className="bg-surface text-fg">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-subtle" />
              </div>
            </Field>

            <Field label="Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder="Tell me about the role, project or idea…"
                className={`${inputClass} resize-y`}
              />
            </Field>

            {/* Honeypot: hidden from people, irresistible to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fg-strong px-5 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
