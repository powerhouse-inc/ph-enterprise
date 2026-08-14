# DESLOP.md

The de-slop review standard for this repo. `COPY_STANDARD.md` governs what the
words say; this governs how we catch generated-looking defaults in copy, UI,
and motion before they ship. Grounded in the impeccable.style rule catalog
(58+ checks) and in what real reviews of this site have actually caught.

## The principle

Slop is not a style. It is the absence of a decision. Every pattern below is
acceptable if someone chose it deliberately, applies it consistently, and can
state the reason. The review question is never "is this pretty" but "did
anyone decide this". Corollary: the strongest tell is drift, two instances of
the same thing that differ for no reason.

## The process

Run three passes on any user-facing diff, in this order. Copy first because
it is cheapest to fix and most often wrong.

### 1. Names pass (copy)

- One canonical name per action, rendered from a constant, never retyped.
  The assessment CTA is `CTA_LABEL` in `enterprise/site/lib/site.ts`.
- No invented synonyms for core concepts (COPY_STANDARD rule 5). If a diff
  introduces a second phrasing of an existing action or concept, the diff is
  wrong, not the standard.
- No em dashes in site copy. Commas, colons, periods, parentheses.
- No developer or ops notes in UI copy (delivery fallbacks, preview behavior,
  form routing). Those live in README or code comments.
- No keyword stuffing: the same noun more than three times in one viewport
  stops meaning anything.
- Buzzword scan per COPY_STANDARD's avoid table. Aphorism cadence and
  "X, not Y" contrast constructions: once per page at most.

### 2. System pass (tokens and components)

- Measure, do not eyeball. Feedback about size, radius, or weight gets
  verified against computed styles in the browser before acting on it. A
  reviewer can be directionally right and factually wrong; fix the real
  defect, not the claimed one.
- Buttons: pairs match in height, radius, and grammar. CTA buttons are
  `rounded-md`. Arrows appear only on outbound links (leaves the site),
  never on one sibling of a pair.
- Colors, radii, fonts, and type sizes come from tokens in `globals.css`.
  A literal value outside the system needs a stated reason in the PR.
- Cards top out at 16px radius. Full-pill shapes are reserved for nothing
  on this site; we deleted our chips deliberately.
- Fix at the source of truth. A drift fixed only at its instances will come
  back; change the component, the constant, or the standard that allowed it.

### 3. Composition pass (rendered screenshots)

Screenshot the affected pages at desktop and mobile widths and look for:

- Eyebrow chips or kickers above headings. Sanctioned form: plain muted
  sentence-case text via `SectionHeading`, and only when the words carry
  information the headline does not. Deletion beats restyling.
- Status dots on static labels; uppercase tracked labels; icon tiles
  stacked above card headings; identical same-size card grids; tiny
  numbered section labels that imitate editorial structure.
- Hairline border paired with a wide diffuse shadow on the same element.
- Gradient text, decorative glows, or glassmorphism outside the owned
  exceptions below.
- Text quality basics: body 14px+, line-height 1.5-1.7, max ~75ch lines,
  WCAG AA contrast, sequential heading levels, 12px+ padding inside any
  bordered container.

### Motion (checked during pass 3)

- Pulse or ping only where data is genuinely live or the animation depicts
  flow; decorative pulses on static status are a named tell.
- Animate transform and opacity only. No bounce or elastic easing. No
  auto-scrolling marquees.
- Scroll reveals enhance entrances but content must exist at rest: respect
  `prefers-reduced-motion`, keep reveal thresholds short, and never gate
  meaning behind an animation.

## Owned exceptions

These match known AI tells and we keep them anyway, as brand decisions.
An exception is owned only while it is executed consistently; extending one
to a new surface requires the same rationale, not habit.

| Pattern (catalog tell) | Why we own it |
| --- | --- |
| Cyan on dark, violet gradients | Powerhouse and Achra brand palettes predate the trend and run through product, site, and assets consistently |
| Warm paper background | Achra design-system surface, used across the marketing estate |
| Inter + Poppins | Established pairing across product and site; two fonts, distinct roles |
| Hero radial halo | Deliberate composition, dimmed to 60%, dissolves under the recede |
| Hero headline gradient text | Single instance, mirrors the backdrop's cyan-to-violet sweep; endpoint runs past the text edge so it reads as tint, not rainbow. Nowhere else. |
| Scroll reveals via GSAP | Single shared implementation, reduced-motion aware |

## Review lessons already paid for

- Near-synonym drift reads as AI slop even when each instance is fine alone
  (four names for one CTA action).
- A chip made a label worse, not better; the cyan status dot we added to
  eyebrows produced textbook "status-chip soup" and got deleted.
- The measurable defect behind a "full pills" complaint was a 9.6px vs 12px
  radius mismatch inside button pairs. Measurement found it; the complaint
  alone would have led to the wrong fix.
- Internal process verbs ("map") leak into CTAs and headlines; the copy
  standard now bans map-as-action. Watch for the next one.
- Infrastructure truth is not marketing copy (the email-fallback footnote
  under the primary CTA).

## Open findings (audited 2026-08-13, not yet fixed)

1. `why-section.tsx`: four identical cards, each an icon tile stacked above
   a heading. Two named tells at once; vary the layout or fold the icons
   into the text line.
2. Use-case pages: uppercase tracked kickers ("THE PROBLEM", "IN SHORT")
   with accent dots; same family as the eyebrows we deleted.
3. `data/*.ts`: 62 em dashes in body copy across use-case, procurement, and
   report content.
4. `app-anatomy-section.tsx`: decorative `animate-ping` on hotspot markers;
   defensible as an interaction affordance, decide and document or remove.
   The `hpw-pulse` travel dots depict data flow and stay.
