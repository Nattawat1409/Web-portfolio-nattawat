"use client";

import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { profile } from "@/lib/data";
// Background removed locally from images/avatar.jpg (transparent PNG)
import cutout from "@/images/avatar-cutout.png";

/**
 * "Pop-out" 3D portrait: a gradient window frame with the cut-out photo standing in it,
 * head breaking out above the frame. Tilts toward the mouse on desktop; the person sits on a
 * nearer 3D layer than the frame, so they shift a little more — that parallax reads as depth.
 */
export function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(-py * 12);
  }
  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-44 shrink-0 self-start md:w-48 md:self-center lg:w-56"
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative [transform-style:preserve-3d]"
      >
        {/* Back glow */}
        <div
          aria-hidden
          className="absolute inset-x-2 bottom-0 h-[70%] rounded-[1.75rem] bg-gradient-to-br from-accent-strong/50 to-cyan/40 blur-3xl"
        />

        {/* The frame: gradient window, faint grid, hairline border. Occupies the lower 74% so the head can pop out. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[74%] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[radial-gradient(120%_90%_at_30%_0%,#6366f1_0%,#312e81_45%,#0e1420_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-cyan/35 blur-2xl" />
        </div>

        {/* The person — nearer 3D layer. Drop shadow + thin light rim separate them from the frame. */}
        {/* 84% of the frame width (centered) so the gradient window shows on both sides */}
        <div
          className="relative mx-auto w-[84%] [filter:drop-shadow(0_18px_22px_rgb(0_0_0/0.55))_drop-shadow(0_0_1px_rgb(199_210_254/0.7))]"
          style={{ transform: "translateZ(36px)" }}
        >
          <Image
            src={cutout}
            alt={`Portrait of ${profile.name}`}
            priority
            placeholder="empty"
            sizes="(min-width: 1024px) 190px, (min-width: 768px) 162px, 148px"
            // The photo's bottom edge cuts the body straight across — round those corners to sit inside the frame.
            // The top is left open so the head breaks out above the frame.
            className="relative block h-auto w-full [clip-path:inset(-60%_0_0_0_round_0_0_1.25rem_1.25rem)]"
          />
        </div>
      </motion.div>

      {/* Floor shadow */}
      <div aria-hidden className="mx-auto mt-3 h-3 w-3/4 rounded-[100%] bg-black/50 blur-md" />
    </motion.div>
  );
}
