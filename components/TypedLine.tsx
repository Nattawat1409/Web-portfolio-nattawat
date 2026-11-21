"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export type TypeStep = {
  text: string;
  /** ms per character */
  speed: number;
  /** ms to wait after the step finishes */
  pauseAfter?: number;
};

type Pos = { seg: number; ch: number; started: boolean };

/**
 * Types a list of strings one after another, like a terminal.
 * Users with prefers-reduced-motion get the finished text immediately.
 */
export function useTypewriter(steps: TypeStep[], startDelay = 450) {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState<Pos>({ seg: 0, ch: 0, started: false });
  const done = pos.seg >= steps.length;

  useEffect(() => {
    if (reduce) {
      setPos({ seg: steps.length, ch: 0, started: true });
      return;
    }
    if (done) return;

    let delay: number;
    let next: Pos;
    if (!pos.started) {
      delay = startDelay;
      next = { ...pos, started: true };
    } else {
      const step = steps[pos.seg];
      if (pos.ch < step.text.length) {
        // Small random jitter so it feels like a person typing, not a metronome
        delay = step.speed + Math.random() * step.speed * 0.6;
        next = { ...pos, ch: pos.ch + 1 };
      } else {
        delay = step.pauseAfter ?? 0;
        next = { seg: pos.seg + 1, ch: 0, started: true };
      }
    }
    const t = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(t);
  }, [pos, done, reduce, steps, startDelay]);

  const typedAt = (i: number) =>
    i < pos.seg ? steps[i].text : i === pos.seg ? steps[i].text.slice(0, pos.ch) : "";
  const isTyping = pos.started && !done && pos.ch < (steps[pos.seg]?.text.length ?? 0);

  return {
    typedAt,
    /** Index of the line that currently owns the caret */
    caretAt: done ? steps.length - 1 : pos.seg,
    /** Which step is underway (steps.length when finished) */
    step: pos.seg,
    isTyping,
    done,
  };
}

type LineProps = {
  full: string;
  typed: string;
  caret: boolean;
  blink: boolean;
  caretClassName?: string;
};

/**
 * One typed line. An invisible copy of the full text sits in the same grid cell, so the
 * final size is reserved up front and nothing below jumps while characters appear.
 */
export function TypedLine({ full, typed, caret, blink, caretClassName = "bg-cyan" }: LineProps) {
  const caretEl = (visible: boolean) => (
    <span
      className={`ml-[0.06em] inline-block h-[0.82em] w-[0.09em] min-w-[2px] translate-y-[0.08em] align-baseline ${caretClassName} ${
        visible ? (blink ? "animate-caret" : "") : "opacity-0"
      }`}
    />
  );

  return (
    <span aria-hidden className="grid">
      <span className="tw-ghost invisible col-start-1 row-start-1">
        {full}
        {caretEl(false)}
      </span>
      <span className="tw-typed col-start-1 row-start-1">
        {typed}
        {caretEl(caret)}
      </span>
    </span>
  );
}
