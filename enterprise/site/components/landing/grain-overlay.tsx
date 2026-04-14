"use client";

import { useEffect, useRef } from "react";

let cachedGrainUrl: string | null = null;

function getGrainUrl(): string {
  if (cachedGrainUrl) return cachedGrainUrl;

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(128, 128);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  cachedGrainUrl = canvas.toDataURL();
  return cachedGrainUrl;
}

export function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grainEl = ref.current;
    if (!grainEl) return;
    grainEl.style.backgroundImage = `url(${getGrainUrl()})`;
  }, []);

  return <div ref={ref} className="grain" aria-hidden="true" />;
}
