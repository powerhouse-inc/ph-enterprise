"use client";
// Click-to-zoom screenshot frame for the article body. The blog's product
// shots are wide (2400px side-by-side captures) and unreadable at column
// width, so they open in the same portal lightbox ControlOwnershipSection
// uses on the landing page: dimmed backdrop, Escape or click to close.

import Image from "next/image";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

function Lightbox({
  src,
  alt,
  width,
  height,
  onClose,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[300] grid place-items-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 cursor-zoom-out bg-black/75 backdrop-blur-sm"
      />
      <div className="relative z-10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="96vw"
          className="h-auto max-h-[88svh] w-auto max-w-[96vw] rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white/85 backdrop-blur-sm transition-colors hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function BlogFigure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <figure className="fade-up my-10">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge: ${alt}`}
        className="group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-[16px] border border-border-light bg-white p-1.5 text-left shadow-[0_2px_12px_rgba(17,22,20,0.1)] transition-shadow hover:shadow-[0_6px_20px_rgba(17,22,20,0.16)]"
      >
        <span className="block overflow-hidden rounded-[11px] bg-paper">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-auto w-full"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        </span>
        <span className="absolute right-3.5 bottom-3.5 flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/zoom:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-3 text-[13px] leading-[1.55] text-copy-muted">
          {caption}
        </figcaption>
      ) : null}
      {isOpen ? (
        <Lightbox
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </figure>
  );
}
