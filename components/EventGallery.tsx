"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EventPhoto } from "@/lib/photos";

type Props = {
  photos: EventPhoto[];
  eventName: string;
  /** Folder name under public/events — shown as a hint in dev when empty. */
  photoDir: string;
};

const VISIBLE = 3;

export function EventGallery({ photos, eventName, photoDir }: Props) {
  if (photos.length === 0) return <EmptyGallery photoDir={photoDir} />;
  return <PhotoGrid photos={photos} eventName={eventName} />;
}

function PhotoGrid({ photos, eventName }: { photos: EventPhoto[]; eventName: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = photos.slice(0, VISIBLE);
  const hidden = photos.length - visible.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  // Tile spans adapt to how many photos exist so 1, 2 or 3+ all look intentional.
  const span = (i: number) => {
    if (visible.length === 1) return "col-span-3 row-span-2";
    if (i === 0) return "col-span-2 row-span-2";
    if (visible.length === 2) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <>
      <ul className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-2" aria-label={`${eventName} photos`}>
        {visible.map((p, i) => (
          <li key={p.src} className={`${span(i)} relative overflow-hidden rounded-xl border border-line`}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group absolute inset-0 cursor-zoom-in"
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 40vw, 66vw" : "(min-width: 1024px) 20vw, 33vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
              {i === visible.length - 1 && hidden > 0 && (
                <span className="absolute inset-0 grid place-items-center bg-bg/60 text-lg font-medium text-fg-strong backdrop-blur-[2px]">
                  +{hidden}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={`${eventName} photo viewer`}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-bg/90 backdrop:backdrop-blur-md"
      >
        {index !== null && (
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-12" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="relative h-full w-full max-w-6xl">
              <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
              {index + 1} / {photos.length}
            </p>
            <button type="button" onClick={close} aria-label="Close photo viewer" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-line-strong bg-bg/70 text-fg hover:text-fg-strong">
              <X className="size-5" />
            </button>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 grid size-11 place-items-center rounded-full border border-line-strong bg-bg/70 text-fg hover:text-fg-strong sm:left-6">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 grid size-11 place-items-center rounded-full border border-line-strong bg-bg/70 text-fg hover:text-fg-strong sm:right-6">
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

function EmptyGallery({ photoDir }: { photoDir: string }) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-hatch flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong text-center ${
            i === 0 ? "col-span-2 row-span-2" : ""
          }`}
        >
          <ImagePlus className={`${i === 0 ? "size-6" : "size-4"} text-subtle`} />
          {i === 0 && (
            <>
              <p className="text-sm text-muted">Event atmosphere photos</p>
              {isDev && (
                <p className="px-4 font-mono text-[10px] text-subtle">
                  drop images into public/events/{photoDir}/
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
