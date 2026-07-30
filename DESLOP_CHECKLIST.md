# Powerhouse Enterprise Deslop Checklist

Use this checklist before any public release, major page edit, or AI-generated
copy/design pass.

## 0. Scope

- [ ] Confirm which routes are in scope.
- [ ] Confirm no deployment or domain action is included unless explicitly
      requested.
- [ ] Read `MESSAGE.md`.
- [ ] Read `COPY_STANDARD.md`.
- [ ] Read `DESIGN_STANDARD.md`.
- [ ] Preserve unrelated work in the git tree.

## 1. Positioning Gate

- [ ] One audience is clear.
- [ ] The canonical promise is preserved.
- [ ] Powerhouse is explained before Clint, Connect, Fusion, Switchboard,
      Renown, or other component names.
- [ ] BAI is framed as the first-workflow delivery team.
- [ ] Vetra is framed as tooling and deployment.
- [ ] No industry buffet appears on the homepage.
- [ ] Unsupported regulatory, security, or quantified claims are removed or
      qualified.

## 2. Copy Gate

- [ ] Each section has one job.
- [ ] Each sentence has a clear subject and verb.
- [ ] Passive voice is rare and intentional.
- [ ] Abstract nouns are grounded in workflow objects or actions.
- [ ] AI is described as scoped assistance, not magic autonomy.
- [ ] No filler phrases, throat-clearing, or generic SaaS claims remain.
- [ ] Numbers are attributed.
- [ ] CTA copy names a real action.
- [ ] Links and CTAs go to real destinations.

## 3. Design Gate

- [ ] The first viewport explains the proposition and shows the primary CTA.
- [ ] The next section is visible or clearly hinted on desktop and mobile.
- [ ] The page uses real product screenshots or concrete system visuals.
- [ ] No nested cards remain.
- [ ] No generic feature-card grid carries the story.
- [ ] Visual hierarchy is obvious in a 10-second glance test.
- [ ] Typography follows the standard.
- [ ] Colors follow the standard.
- [ ] Icons are useful, not ornamental.
- [ ] Motion is purposeful and respects reduced motion.

## 4. Implementation Gate

- [ ] Metadata uses `https://enterprise.powerhouse.io`.
- [ ] Canonical URL is correct for each indexed route.
- [ ] Open Graph title, description, image, and alt text are current.
- [ ] Sitemap lists only indexed public routes.
- [ ] Robots excludes archived routes.
- [ ] Archived routes use `noindex`.
- [ ] Stale component routes redirect to the architecture page.
- [ ] Images return 200.
- [ ] Icons return 200.
- [ ] No dead internal links remain.
- [ ] No hidden deployment-only host leaks into metadata.

## 5. Browser QA Gate

Run against a production build.

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Start local production server.
- [ ] Desktop screenshot: homepage.
- [ ] Mobile screenshot: homepage.
- [ ] Desktop screenshot: architecture page.
- [ ] Reduced-motion pass.
- [ ] Console has no errors.
- [ ] No page errors.
- [ ] No horizontal overflow.
- [ ] No text overlap.
- [ ] No blank image or animation states.
- [ ] Hero exposes or hints the next section.
- [ ] Primary CTA works.
- [ ] Secondary CTA works.

## 6. Human Review Gate

- [ ] Read the page out loud once.
- [ ] Cut any sentence you would not say to a serious buyer.
- [ ] Confirm the strongest proof is visible before the engagement CTA.
- [ ] Confirm archived pages are intentionally retained, not accidentally live.
- [ ] Update `DESLOP_REPORT.md` with decisions, fixes, and remaining risks.

## 7. Optional Tooling

Use these only when network and tool access are approved.

```bash
npx skills add https://github.com/hardikpandya/stop-slop --skill stop-slop
npx skills add https://uizze.com
npx impeccable install
npx impeccable detect enterprise/site
```

Suggested Impeccable commands after install:

```text
/impeccable init
/impeccable critique the homepage
/impeccable polish the homepage
/impeccable audit the homepage
```

