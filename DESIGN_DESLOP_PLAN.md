# Powerhouse Enterprise Design Deslop Plan

Branch: `codex-deslop-design-20260803`

## Goal

Redesign the current homepage surface without changing the now-improved
positioning. The site should feel like a professional-grade enterprise sales
page for operations and technology leaders: mature, high-trust, product-aware,
specific, and commercially credible.

The redesign should not become a louder SaaS landing page, a dated blueprint
interface, or a theatrical AI startup page. The work is to reassess the design
guidance, subtract generic decoration, improve hierarchy, and make the product
proposition easier to understand and believe.

## References

- Existing project context: `MESSAGE.md`, `COPY_STANDARD.md`, `DESIGN.md`,
  `DESIGN_STANDARD.md`. Treat the design docs as source material to audit, not
  as fixed truth.
- Impeccable workflow: use context, critique, layout, typeset, distill, polish,
  audit, and harden as explicit passes.
- Claude/Vetra design share: currently gated behind Claude login from this
  environment. Treat it only as directional until the HTML is exported or
  attached.

## Current Findings

1. **The design guidelines themselves may be stale**
   The current docs over-index on "dark blueprint", green accent, and square
   panels. That direction helped move away from generic AI gloss, but it now
   risks feeling dated, narrow, and too diagrammatic for an enterprise sales
   page. Reassess those rules before implementing.

2. **Design system drift**
   The docs define a dark blueprint canvas, green operational accent, square
   panels, Inter typography, and product evidence. The implementation still uses
   cyan/purple gradients, radial glow blobs, gradient text, rounder panels, and
   ornamental hero motion.

3. **Too much equal-weight structure**
   Sections are mostly separate bands with similar heading sizes, similar top
   borders, and repeated cards. The page scans as a sequence of modules instead
   of one unfolding argument.

4. **Hero lacks concrete product evidence**
   The current hero has a floating mark and abstract glows. It explains the
   promise, but it does not show a workflow boundary, product surface, or
   architecture artifact in the first viewport.

5. **Cards are overused**
   The workflow example and CTA rely on grids of similar cards. This creates a
   generic SaaS texture and makes all points feel equally important.

6. **Motion is more decorative than explanatory**
   The animation system reveals content, but the hero blobs and mark glow do not
   clarify the workflow proposition.

7. **The final CTA is busy**
   The assessment section has three equal cards, several routes, and competing
   actions. The desired action should be more direct: start with the workflow
   assessment.

## Design North Star

Use the feel of a serious enterprise product and sales page:

- clear commercial argument, not just an aesthetic system
- mature enterprise confidence without stock corporate blandness
- refined product evidence: real screenshots, workflow artifacts, and concrete
  architecture where useful
- strong editorial hierarchy with generous whitespace and deliberate section
  pacing
- premium neutral palette with restrained accent use
- modern panels and surfaces chosen for clarity, not square-panel dogma
- motion that supports comprehension, not atmosphere
- one obvious primary action: start the workflow assessment

Retire "dark blueprint with square panels" as a default prescription. A subtle
technical or operational motif is allowed only if it makes the proposition more
legible.

## Homepage Structure To Preserve

1. Hero
2. Current reality
3. How Powerhouse works
4. Product/workflow evidence
5. Why ownership matters
6. Workflow assessment CTA

The sequence is good. The surface and emphasis need work.

## Implementation Phases

### Phase 0: Reassess Repo Design Guidelines

Before changing the homepage UI, reassess and update the design guidance itself.

- Audit `DESIGN.md` and `DESIGN_STANDARD.md` against the current goal:
  professional-grade enterprise sales page.
- Identify which guidance to keep, revise, or retire:
  - keep: real product evidence, strong hierarchy, no generic AI ornament,
    no unsupported claims, accessible contrast, mobile discipline
  - revise: dark blueprint as mandatory direction, square panels as a rule,
    green as the only credible accent, mono labels as a recurring motif
  - retire: any rule that forces the page into a dated technical drawing style
- Review current implementation against modern enterprise references:
  Retool, Celonis, Unstructured, Impeccable-style critique, and the Claude/Vetra
  share if the HTML becomes available.
- Produce an updated design brief before UI edits:
  - visual positioning
  - palette direction
  - typography direction
  - surface/radius/depth rules
  - product evidence rules
  - motion rules
  - mobile/desktop priorities
- Update `DESIGN.md` and `DESIGN_STANDARD.md` before the homepage implementation
  pass.

Acceptance:

- The repo no longer instructs agents to default to a dated blueprint/square
  panel aesthetic.
- The design docs define a current enterprise-sales standard that can guide
  implementation and QA.
- The homepage redesign has a clear, written visual brief before component work
  starts.

### Phase 1: Visual System Reset

- Replace cyan/purple gradient dominance with the updated palette from Phase 0.
- Remove gradient text from hero and section headings.
- Remove radial blobs, halo glows, and decorative hero mark animation.
- Normalize radius, surface, border, and depth rules according to the updated
  enterprise-sales standard.
- Replace hard-coded one-off colors with local tokens.

Acceptance:

- No purple/blue gradient dominance on `/`.
- No decorative radial glow blobs.
- H1, body, CTAs, panels, screenshots, and captions use a coherent token set.

### Phase 2: Hero Recomposition

- Keep the H1: "Turn workflows into software you own."
- Add a concrete right-side system visual on desktop:
  - workflow boundary diagram, or
  - cropped real product evidence, or
  - hybrid product-plus-workflow artifact showing inputs, boundary, approval,
    and history.
- Make the hero shorter and more intentional so the next section is visible.
- Keep one primary CTA and one quiet secondary CTA.
- Avoid hero eyebrow/pill chips.

Acceptance:

- First viewport answers what this is, who it is for, what it makes possible,
  and what to do next.
- No abstract ornament is carrying the hero.
- Mobile hero has no awkward text wrapping or hidden CTA.

### Phase 3: Replace Card Grids With Explanatory Layouts

- Current reality: use one strong split layout or evidence strip, not a card
  grid.
- How it works: change from three/five equal feature items into a process rail:
  connect, structure, scope AI, approve, retain history.
- Workflow example: use a single invoice/workflow artifact panel, with steps
  attached as annotations rather than five cards.
- Ownership: use a compact comparison/table or control checklist instead of
  repeated cards.
- CTA: reduce to one focused assessment close with deliverables and email
  capture.

Acceptance:

- Each section uses the layout that best explains the content.
- No section feels like interchangeable SaaS feature cards.
- The page has rhythm: big idea, evidence, mechanism, control, action.

### Phase 4: Product Evidence Pass

- Use existing screenshots from `enterprise/site/public/usecases` where useful.
- Prefer one or two inspectable screenshots over many abstract icons.
- Add captions that explain what the prospect is looking at.
- If screenshots are too detailed for the homepage, crop or frame them as
  evidence, then route deeper examples to `/use-cases`.

Acceptance:

- At least one first-page product evidence element is visible above or near the
  fold on desktop.
- Product evidence is legible, not blurred background texture.
- Captions are concrete and tied to workflow objects/actions.

### Phase 5: Typesetting And Hierarchy

- Use the typography direction defined in Phase 0 consistently across the
  homepage.
- Remove negative letter spacing.
- Use monospace only if the updated design brief calls for it.
- Tighten line lengths: body copy stays near 45 to 80 characters.
- De-emphasize labels and metadata; emphasize H1, section claims, proof, and CTA.

Acceptance:

- A 10-second scan identifies the page promise, mechanism, proof, and next step.
- Section headings are not all the same visual weight.
- Button text and headings fit on mobile.

### Phase 6: Interaction, Motion, And Form Polish

- Keep content visible without waiting for animation.
- Use motion only for reveal, flow progression, or modal state.
- Ensure reduced motion disables decorative animation.
- Keep the workflow assessment popup centered and visually consistent with the
  new enterprise-sales system.
- Make form success/error states clear and non-alarming.

Acceptance:

- No blank initial animation states.
- No decorative pulsing/glowing motion.
- Keyboard focus, Escape, and click-outside behavior work for the modal.

### Phase 7: Responsive And Hardening QA

- Test desktop, tablet, and mobile in browser.
- Check long email addresses, long CTA text, and section heading wraps.
- Check contrast and focus states.
- Check console errors.
- Run lint and production build.
- Capture desktop and mobile screenshots before deciding whether to merge.

Acceptance:

- `npm run lint` passes.
- `npm run build` passes.
- Browser QA confirms no overlap, blank states, or hidden primary actions.
- Homepage still routes the assessment CTA to the email capture path.

## First Implementation Pass

Start with these files:

- `DESIGN.md`
- `DESIGN_STANDARD.md`
- `enterprise/site/app/globals.css`
- `enterprise/site/components/landing/landing-hero.module.css`
- `enterprise/site/components/landing/landing-hero.tsx`
- `enterprise/site/components/landing/problem-section.tsx`
- `enterprise/site/components/landing/solution-section.tsx`
- `enterprise/site/components/landing/workflow-example-section.tsx`
- `enterprise/site/components/landing/why-section.tsx`
- `enterprise/site/components/landing/contact-cta.tsx`

Avoid touching archived routes or use-case detail pages in the first pass unless
we deliberately decide to promote `/use-cases` again.

## Decision Gates

Before implementation, decide:

1. What should replace the current blueprint/square-panel rule as the canonical
   visual direction?
2. Should the hero evidence be a real screenshot, a product/workflow diagram, or
   a hybrid screenshot-plus-boundary artifact?
3. Should `/use-cases` remain hidden, or become a quiet "examples" route linked
   from proof/product evidence?
4. Should the final CTA be only email capture, or include a secondary
   architecture link?
