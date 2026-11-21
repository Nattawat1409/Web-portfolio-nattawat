"use client";

import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0e1420",
            border: "1px solid rgb(148 163 184 / 0.22)",
            color: "#e2e8f0",
          },
        }}
      />
    </MotionConfig>
  );
}
