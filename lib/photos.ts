import "server-only";
import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type EventPhoto = { src: string; alt: string };

/**
 * Reads every image in /public/events/<dir> at build time.
 * Drop photos into the folder (01.jpg, 02.jpg, ...) and redeploy — no code changes needed.
 */
export function getEventPhotos(dir: string, eventName: string): EventPhoto[] {
  const abs = path.join(process.cwd(), "public", "events", dir);
  let files: string[] = [];
  try {
    files = fs.readdirSync(abs);
  } catch {
    return [];
  }
  return files
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f, i) => ({
      src: `/events/${dir}/${encodeURIComponent(f)}`,
      alt: `${eventName} — event photo ${i + 1}`,
    }));
}
