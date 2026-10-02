// Renders the typed blocks in data/blog.ts onto the landing page's paper
// sections: warm ground, ink copy, purple links. Code and screenshots sit in
// dark panels, the same inversion HowPowerhouseWorks uses for its diagram, so
// technical material reads as an artifact set into the page.
//
// Server-only. The `fade-up` class is picked up by BlogReveal's scope hook.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogFigure } from "@/components/blog/blog-figure";
import type { BlogBlock, BlogInline } from "@/data/blog";
import { cn } from "@/lib/utils";

/** Anchor id for a heading, so sections stay linkable from elsewhere. */
function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isExternal(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

const BODY_TEXT_CLASS =
  "text-[18px] leading-[1.72] text-pretty text-copy-muted";

const INLINE_CODE_CLASS =
  "rounded-[5px] border border-border-light bg-[rgba(17,22,20,0.045)] box-decoration-clone px-[6px] py-[1.5px] font-mono text-[0.87em] break-words text-copy";

function Inlines({ spans }: { spans: readonly BlogInline[] }) {
  return (
    <>
      {spans.map((span, index) => {
        if (typeof span === "string") return span;

        if ("code" in span) {
          return (
            <code key={index} className={INLINE_CODE_CLASS}>
              {span.code}
            </code>
          );
        }

        const linkClass = "font-medium text-[#7A3AFF] hover:underline";

        if (isExternal(span.href)) {
          return (
            <a
              key={index}
              href={span.href}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              {span.text}
            </a>
          );
        }

        return (
          <Link key={index} href={span.href} className={linkClass}>
            {span.text}
          </Link>
        );
      })}
    </>
  );
}

/** Dark panel, inverted out of the paper ground. */
function CodeBlock({
  language,
  label,
  code,
}: {
  language: string;
  label?: string;
  code: string;
}) {
  return (
    <figure className="fade-up my-9 overflow-hidden rounded-[16px] bg-[linear-gradient(170deg,#22262e_0%,#1b1e24_40%,#14161b_100%)] shadow-[0_2px_12px_rgba(17,22,20,0.12)]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <span className="text-[12.5px] text-white/50">{label ?? language}</span>
        {label ? (
          <span className="font-mono text-[11px] tracking-[0.06em] text-white/35 uppercase">
            {language}
          </span>
        ) : null}
      </figcaption>
      <pre className="overflow-x-auto px-5 py-4">
        <code className="font-mono text-[12.5px] leading-[1.75] text-white/75 md:text-[13px]">
          {code}
        </code>
      </pre>
    </figure>
  );
}

/**
 * Light, in the body's own type: a comparison is prose in columns, so it
 * reads as text rather than as a code panel. Below md each row stacks and
 * repeats the column headers as labels, so nothing scrolls sideways.
 */
function Table({ block }: { block: Extract<BlogBlock, { type: "table" }> }) {
  return (
    <figure className="fade-up my-9">
      <table className="w-full border-collapse text-left max-md:block">
        {block.caption ? (
          <caption className="mb-3 text-left text-[13px] leading-[1.55] text-copy-muted max-md:block">
            {block.caption}
          </caption>
        ) : null}
        <thead className="max-md:hidden">
          <tr className="border-b border-copy/25">
            {block.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="py-3 pr-6 align-bottom text-[14px] font-semibold text-copy last:pr-0"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:block">
          {block.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border-light align-top max-md:block max-md:py-4"
            >
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th
                    key={cellIndex}
                    scope="row"
                    className="py-4 pr-6 text-[15.5px] leading-[1.6] font-semibold text-copy max-md:block max-md:py-0 md:w-[22%]"
                  >
                    <Inlines spans={cell} />
                  </th>
                ) : (
                  <td
                    key={cellIndex}
                    className="py-4 pr-6 text-[15.5px] leading-[1.6] text-pretty text-copy-muted last:pr-0 max-md:block max-md:pt-2 max-md:pb-0"
                  >
                    <span className="block text-[13px] font-medium text-copy md:hidden">
                      {block.columns[cellIndex]}
                    </span>
                    <Inlines spans={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Media({ block }: { block: Extract<BlogBlock, { type: "media" }> }) {
  // Slots stay in the data file with src: null while the asset is produced.
  if (!block.src) return null;

  if (block.kind === "image") {
    return (
      <BlogFigure
        src={block.src}
        alt={block.alt}
        width={block.width ?? 1600}
        height={block.height ?? 1000}
        caption={block.caption}
        displayWidth={block.displayWidth}
      />
    );
  }

  return (
    <figure className="fade-up my-10">
      <div className="overflow-hidden rounded-[16px] border border-border-light bg-white p-1.5 shadow-[0_2px_12px_rgba(17,22,20,0.1)]">
        <div className="overflow-hidden rounded-[11px] bg-paper">
          <video
            // width/height reserve the aspect ratio while loading; h-auto keeps
            // the attribute height from pinning the frame at 720px.
            className="block h-auto w-full"
            src={block.src}
            poster={block.poster}
            width={block.width}
            height={block.height}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={block.alt}
          />
        </div>
      </div>
      {block.caption ? (
        <figcaption className="mt-3 text-[13px] leading-[1.55] text-copy-muted">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Resources({
  block,
}: {
  block: Extract<BlogBlock, { type: "resources" }>;
}) {
  return (
    <section
      className={cn(
        "fade-up rounded-[16px] border border-border-light bg-white shadow-[0_2px_12px_rgba(17,22,20,0.1)]",
        block.compact ? "my-9 p-6" : "mt-16 p-7 md:p-8",
      )}
    >
      <p className="text-[12px] font-semibold tracking-[0.06em] text-copy-muted uppercase">
        {block.title}
      </p>
      <ul className="mt-5 divide-y divide-border-light border-t border-border-light">
        {block.items.map((item) => {
          const external = isExternal(item.href);
          const content = (
            <>
              <span className="flex items-center gap-1.5 text-[15px] font-semibold text-[#7A3AFF] group-hover:underline">
                {item.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="mt-1.5 block text-[14.5px] leading-[1.6] text-copy-muted">
                {item.note}
              </span>
            </>
          );

          return (
            <li key={item.href}>
              {external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block py-4"
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className="group block py-4">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function BlogBody({ blocks }: { blocks: readonly BlogBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                id={block.id ?? headingId(block.text)}
                className="font-heading mt-16 mb-5 scroll-mt-28 text-[clamp(26px,2.8vw,34px)] leading-[1.14] font-[680] tracking-[-0.02em] text-copy first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p key={index} className={`mt-5 ${BODY_TEXT_CLASS}`}>
                <Inlines spans={block.spans} />
              </p>
            );

          case "list":
            return (
              <ul key={index} className="mt-5 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`relative pl-[22px] ${BODY_TEXT_CLASS}`}
                  >
                    <span
                      className="absolute top-[0.62em] left-0 h-[7px] w-[7px] rounded-full border border-copy-muted/45"
                      aria-hidden="true"
                    />
                    <Inlines spans={item} />
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <CodeBlock
                key={index}
                language={block.language}
                label={block.label}
                code={block.code}
              />
            );

          case "table":
            return <Table key={index} block={block} />;

          case "media":
            return <Media key={index} block={block} />;

          case "note":
            return (
              <aside
                key={index}
                className="fade-up my-9 rounded-[16px] border border-border-light bg-white p-6 text-[15px] leading-[1.65] text-copy-muted shadow-[0_2px_12px_rgba(17,22,20,0.06)]"
              >
                <Inlines spans={block.spans} />
              </aside>
            );

          case "primer":
            // A real heading for crawlers and screen readers ("what is X" is a
            // search query). From xl the box sits in the margin beside the
            // column, at the height it is placed in the text, and takes no
            // room in the flow; below xl it is an ordinary box. The article
            // is the positioned ancestor.
            return (
              <aside
                key={index}
                aria-labelledby={headingId(block.label)}
                className="fade-up my-9 rounded-[14px] border border-border-light bg-white p-5 shadow-[0_2px_12px_rgba(17,22,20,0.06)] xl:absolute xl:left-[calc(100%+28px)] xl:my-0 xl:w-[248px]"
              >
                <h2
                  id={headingId(block.label)}
                  className="font-heading scroll-mt-28 text-[16px] leading-[1.3] font-semibold text-copy"
                >
                  {block.label}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-pretty text-copy-muted">
                  <Inlines spans={block.spans} />
                </p>
              </aside>
            );

          case "resources":
            return <Resources key={index} block={block} />;
        }
      })}
    </div>
  );
}
