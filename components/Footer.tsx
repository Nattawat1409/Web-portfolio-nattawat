import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
          <span className="block sm:inline"> Built with Next.js &amp; Tailwind CSS.</span>
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg-strong">
          Back to top <ArrowUp className="size-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
