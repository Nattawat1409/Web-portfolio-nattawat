"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
// Square headshot cropped from images/avatar.jpg (a full photo would show mostly background at 32px)
import avatar from "@/images/avatar-headshot.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section that occupies the middle band of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? "border-b border-line bg-bg/95 backdrop-blur-xl"
          : scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm font-medium text-fg-strong">
          <Image
            src={avatar}
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 rounded-full object-cover ring-1 ring-line-strong transition-shadow group-hover:ring-cyan/60"
          />
          {profile.shortName}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors hover:text-fg-strong ${
                  active === l.id ? "text-fg-strong" : "text-muted"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-accent to-cyan"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={profile.links.cv}
            download
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg-strong"
          >
            <Download className="size-3.5" aria-hidden />
            CV
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-fg-strong px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-lg border border-line text-fg lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 text-base text-fg transition-colors hover:text-fg-strong"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={profile.links.cv}
                  download
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line-strong py-3 text-sm text-fg"
                >
                  <Download className="size-4" aria-hidden /> Download CV
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg bg-fg-strong py-3 text-sm font-medium text-bg"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
