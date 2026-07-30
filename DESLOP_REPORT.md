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
- Reworked "Current reality" into a fragmented-context map instead of a plain
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
