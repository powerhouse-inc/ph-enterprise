"use client";

import Image from "next/image";
import { useState } from "react";
import type { ModelAnatomy as Anatomy } from "@/data/integrations";

type Field = { name: string; type: string; note: string };

/**
 * The document model on the editor a person actually uses. Pointing at a box
 * on the capture, or at a row in the list, names the field behind it.
 *
 * The list is the accessible path: every field is a button in reading order,
 * so keyboard and screen-reader users get the same information as the
 * pointer, and the boxes on the image are pointer-only.
 */
export function ModelAnatomy({
  name,
  fields,
  anatomy,
}: {
  name: string;
  fields: readonly Field[];
  anatomy: Anatomy;
}) {
  const [active, setActive] = useState(fields[0]?.name);
  const spot = anatomy.spots.find((s) => s.field === active);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,654px)_minmax(0,1fr)] lg:gap-14">
      <div className="relative overflow-hidden rounded-[14px] border border-border-light bg-white">
        <Image
          src={anatomy.src}
          alt={anatomy.alt}
          width={anatomy.width}
          height={anatomy.height}
          sizes="(min-width: 1024px) 654px, 92vw"
          className="block h-auto w-full"
        />

        {anatomy.spots.map((s) => (
          <div
            key={s.field}
            aria-hidden="true"
            onMouseEnter={() => setActive(s.field)}
            onClick={() => setActive(s.field)}
            className="absolute cursor-default"
            style={{
              left: pct(s.x, anatomy.width),
              top: pct(s.y, anatomy.height),
              width: pct(s.w, anatomy.width),
              height: pct(s.h, anatomy.height),
            }}
          />
        ))}

        {/* One highlight that moves, rather than one per box: the page dims
            around the active field so the eye lands on it. */}
        {spot ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-md outline-[1.5px] outline-copy outline-solid transition-all duration-200 ease-out"
            style={{
              left: pct(spot.x - 4, anatomy.width),
              top: pct(spot.y - 4, anatomy.height),
              width: pct(spot.w + 8, anatomy.width),
              height: pct(spot.h + 8, anatomy.height),
              boxShadow: "0 0 0 9999px rgba(17, 22, 20, 0.22)",
            }}
          />
        ) : null}
      </div>

      <div>
        <p className="flex items-baseline justify-between gap-3 border-b border-border-light pb-3">
          <span className="font-mono text-[13.5px] font-semibold text-copy">{name}</span>
          <span className="text-[12px] text-copy-muted">{fields.length} fields</span>
        </p>
        <ul>
          {fields.map((f) => {
            const on = f.name === active;
            return (
              <li key={f.name} className="border-b border-border-light">
                <button
                  type="button"
                  onMouseEnter={() => setActive(f.name)}
                  onFocus={() => setActive(f.name)}
                  onClick={() => setActive(f.name)}
                  aria-expanded={on}
                  className="w-full py-2.5 text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className={`font-mono text-[13px] ${on ? "text-copy" : "text-copy-muted"}`}>
                      {f.name}
                    </span>
                    <span className="font-mono text-[12px] text-copy-muted/80">{f.type}</span>
                  </span>
                  {on ? (
                    <span className="mt-1 block text-[14px] leading-[1.5] text-pretty text-copy-muted">
                      {f.note}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
