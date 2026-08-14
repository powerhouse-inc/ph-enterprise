# Powerhouse Enterprise Deslop Report

Date: 2026-07-29

## Current Scope

Create the repo-level deslop standards first. Do not deploy. Do not configure
the production domain. User explicitly paused deployment to the new URL.

## Reference Stack

- `MESSAGE.md`: positioning source of truth.
- `COPY_STANDARD.md`: copy clarity, controlled language, proof, and anti-slop
  rules.
- `DESIGN_STANDARD.md`: visual quality, hierarchy, screenshots, responsive, and
  anti-UI-slop rules.
- `DESLOP_CHECKLIST.md`: repeatable release checklist.

External references:

- ASD-STE100: https://www.asd-ste100.org/
- stop-slop: https://www.skills.sh/hardikpandya/stop-slop/stop-slop
- anti-ui-slop: https://www.skills.sh/site/uizze.com/anti-ui-slop
- Impeccable: https://impeccable.style/docs/

## Current Local Site State

Implemented before this report:

- Homepage condensed around the canonical promise.
- Architecture page added for component names and technical structure.
- Industry routes retained but noindexed and removed from sitemap.
- Stale component routes redirected to architecture anchors.
- Canonical URL, sitemap, robots, icons, and Open Graph metadata updated.
- Primary CTA routes to BAI engagement path.
- Product screenshots used as proof.

Verified before this report:

- `npm run lint` passed.
- `npm run build` passed.
- Local endpoint audit passed for canonical metadata, robots, sitemap, icons,
  archived-route noindex, stale redirects, and image optimizer responses.

Not completed:

- Final post-fix browser screenshot pass was blocked by unavailable or declined
  browser execution permissions.
- Deployment and domain verification are paused by user request.

## Initial Deslop Findings

### P0

None for local source after the latest build checks.

### P1

- Final browser QA needs a clean post-fix screenshot pass when browser execution
  is available.
- Archived industry routes still contain older claims and positioning. They are
  noindexed and unlisted, but they need a later archive decision.
- Old landing components remain in the repo. They are no longer used by the
  homepage but may confuse future agents if they are edited instead of the new
  page.
- Product screenshots are present, but the proof section can still become more
  specific with captions tied to workflow objects and real outcomes.

### P2

- README still references older brand/design assets. That is useful context,
  but the new standards should become the default for future site work.
- The copy should get a full line-by-line pass against `COPY_STANDARD.md`.
- The architecture page should get a follow-up pass to remove any wording that
  sounds like broad platform marketing rather than buyer-facing explanation.

## Next Deslop Pass

1. Run copy review on `/`, `/architecture`, and `/use-cases`.
2. Rewrite any sentence that fails `COPY_STANDARD.md`.
3. Run visual review on homepage desktop and mobile screenshots.
4. Remove or archive unused old homepage components if they are no longer useful.
5. Add lightweight scripts or checklist commands only after the manual standard
   proves useful.

## Decisions

- Do not copy ASD-STE100 into the repo. Reference it and keep our own
  Powerhouse-specific controlled-language rules.
- Do not install external skills until explicitly approved.
- Do not deploy or configure `enterprise.powerhouse.io` in this phase.

## Homepage Deslop Pass

Date: 2026-07-29

Files changed:

- `enterprise/site/app/page.tsx`

Copy changes:

- Rewrote hero support copy into short, active sentences.
- Tightened current-reality copy around documents, spreadsheets, inboxes, and
  legacy systems.
- Replaced vague workflow language with boundary, state, approval, and history
  language.
- Qualified proof metrics with BAI attribution.
- Reworked assessment deliverables from generic bullets into named outputs.
- Removed phrases that tripped the first anti-slop scan.

Design changes:

- Replaced the five-card "How Powerhouse works" grid with an ordered workflow
  sequence.
- Replaced the four-card ownership grid with a denser ownership-control list.
- Kept product screenshots as framed evidence, but made captions describe the
  visible workflow objects.
- Kept the assessment deliverables as the only framed panel in the final CTA
  section.

Checks run:

- Banned-phrase scan on `enterprise/site/app/page.tsx`.
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed.

Still needed:

- Desktop and mobile browser screenshot pass. Completed in the homepage design
  deslop pass below.

## Homepage Design Deslop Pass

Date: 2026-07-30

Files changed:

- `enterprise/site/app/page.tsx`
- `enterprise/site/app/layout.tsx`
- `enterprise/site/app/favicon.ico/route.ts`

Design changes:

- Added a concise workflow-boundary strip under the hero CTA on desktop.
- Added a shorter mobile boundary line so the next section remains visible in
  the first viewport.
- Reworked "Current reality" into a siloed-context map instead of a plain
  list.
- Reworked "How Powerhouse works" into a pipeline-style sequence.
- Reworked ownership into a control table.
- Reworked proof into a product evidence wall with two real screenshots.
- Made the RFP Hub screenshot eager-loaded so screenshot QA does not capture a
  blank lazy image state.
- Added a `/favicon.ico` response for local browser requests.
- Rendered Vercel Analytics only on Vercel to avoid local QA console noise.

Checks run:

- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed.
- Desktop screenshot QA passed on local production server port 3001.
- Mobile screenshot QA passed on local production server port 3001.
- Browser QA showed no console errors, no page errors, no 404 responses, no
  missing images, no horizontal overflow, and next-section visibility on both
  desktop and mobile.

Screenshots:

- `/private/tmp/ph-enterprise-design-home-desktop.png`
- `/private/tmp/ph-enterprise-design-home-mobile.png`

Still needed:

- Architecture page design deslop.
- Use-cases page design deslop.

## Impeccable Integration Pass

Date: 2026-07-30

External source:

- https://impeccable.style/
- https://impeccable.style/docs/
- https://impeccable.style/slop/

Repo-level changes:

- Added `PRODUCT.md` for Impeccable-style product context.
- Added `DESIGN.md` for Impeccable-style visual system context.
- Updated `DESIGN_STANDARD.md` with the current blueprint palette, typography,
  radius/depth rules, and Impeccable anti-slop gate.
- Updated `DESLOP_CHECKLIST.md` with explicit Impeccable checks.

Homepage changes:

- Removed repeated tiny section-number eyebrows.
- Removed decorative radial spotlight background.
- Removed wide glow shadows from blueprint panels and primary CTA.
- Removed obsolete global gradient-text, feature-card accent, and side-accent
  helpers from `globals.css`; old unused landing components remain preserved for
  a later archive/removal decision.
- Kept the blueprint grid because it supports the technical drawing metaphor.

Impeccable-derived findings addressed:

- Hero eyebrow/pill chip: removed in the prior hero cleanup.
- Tiny numbered section labels: removed.
- Radial decorative glow: removed.
- Dark-mode glow effect: reduced.

Still needed:

- Run `npx impeccable detect enterprise/site` only if the user explicitly
  approves running a third-party CLI over local source files.

Checks run:

- Local Impeccable-style source scan on homepage-related files passed; remaining
  matches were only the anti-slop terms documented in standards files.
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed.
- Desktop browser QA passed on local production server port 3000.
- Mobile browser QA passed on local production server port 3000.
- Browser QA showed no console errors, no page errors, no 404 responses, no
  missing images, no horizontal overflow, no hero tag, no repeated section
  number labels, and next-section visibility on both desktop and mobile.

Screenshots:

- `/private/tmp/ph-enterprise-impeccable-desktop-viewport.png`
- `/private/tmp/ph-enterprise-impeccable-mobile-viewport.png`

Blocked:

- Direct `npx impeccable detect ...` was not run. The environment rejected the
  third-party CLI execution because it could expose local source files. Run it
  only after explicit approval for that risk.

## Impeccable Detect Run: 2026-08-14

`npx impeccable detect` (v3.6.0) was run against the local dev server for the
homepage and the architecture page. This is the first direct run of the
third-party detector on this repo.

### Homepage: 71 findings

By category, largest first:

- 23x undersized-ui-text. All in the illustrative workflow diagrams: the
  siloed-data panel (Receipts 8.5px, $182.40 7.5px, In review 7px, Invoices,
  Claim status, Finance system, Legacy tracker, Inbox, AI badge) and the
  how-it-works and control-ownership vignettes (Receipts & invoices 10.5px,
  2 operators only 10px, Approved 9.5px). The detector floor is 11px for
  functional text. These labels are decoration inside mock UI drawings, so
  the severity is lower than the count suggests, but several sit at 7 to 9px
  where they render as noise on small screens.
- 18x nested-cards. Mini document cards sit inside silo boxes inside panel
  cards in the diagram sections. DESIGN_STANDARD.md already forbids cards
  inside cards; the diagrams are the main offender.
- 9x ai-color-palette. Cyan neon text and cyan gradients on the dark hero,
  plus purple/violet gradient surfaces. The detector treats cyan-on-dark and
  purple gradients as the two strongest AI-generated tells. Our brand accent
  is cyan on ink by standard, so part of this is a deliberate choice, but the
  purple additions (hero-gradient-bg.jpg, #7A3AFF CTA section, #cdb2ff halo)
  now mix both flagged palettes on one page.
- 6x radial-spotlight-glow. hero-halo and hero-halo-outer behind the 3D mark,
  a 1176x1159 purple #7a3aff glow, and three 376x457 spotlight washes behind
  the stack-section cards (#9810fa, #24d7e8, #00a63e). DESIGN_STANDARD.md
  forbids decorative radial glows; these violate our own standard.
- 5x low-contrast. Real accessibility failures: "You control which users and
  what systems access your data." at 2.5:1, "Non-confidential data only" at
  2.9:1, and three how-it-works step descriptions over gradient backgrounds
  at 1.2:1 pixel contrast ("Start from the documents...", "Model the
  objects...", "Use AI to extract..."). WCAG AA needs 4.5:1.
- 3x tiny-text (10 to 11.5px body strings), 3x dark-glow (zero-offset colored
  box-shadows in #cdb2ff, #7ed9a7, #5c523c), 1x radial-halo (#cdb2ff on dark),
  1x line-length (~129 chars against the 80 char standard), 1x cramped-padding
  (text at 0px vertical padding), 1x overused-font (Inter carries 78% of text;
  informational, Inter is our chosen face).

### Architecture page: 80 findings

- 79x ai-color-palette, all the same pattern: brand cyan text on dark ink,
  flagged on every label and link. One systemic disagreement between the
  detector and our palette, not 79 separate problems.
- 1x overused-font (Inter, informational).

### Assessment

Priority order for fixes:

1. Low-contrast text (5 findings). Genuine WCAG AA failures on real copy.
2. Radial spotlight glows and colored dark glows. Forbidden by our own
   DESIGN_STANDARD.md and crept back in with the new hero and stack designs.
3. Diagram text below 9px. Keep the vignettes but lift the smallest labels.
4. Palette coherence. Decide whether purple (#7A3AFF family) is joining the
   system or not. It currently appears in the hero background image, the
   get-started CTA, and glow decoration while the standard still names cyan
   as the only action accent. Update DESIGN_STANDARD.md or remove the purple.
5. Nested cards in diagrams. Consider flattening silo boxes to borders or
   dividers.

Accepted or informational:

- Cyan-on-dark as brand identity (the architecture page's 79 repeats).
- Inter as the site face.
- Illustrative micro-labels at 10px and above inside diagram vignettes.

Raw output: scratchpad impeccable-home.txt and impeccable-arch.txt from the
2026-08-14 session.
