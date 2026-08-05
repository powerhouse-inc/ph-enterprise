# Powerhouse Enterprise Design Context

This file captures the current visual direction for agents and design review.
`DESIGN_STANDARD.md` contains the full release standard.

## Visual Direction

Powerhouse Enterprise should feel like a professional enterprise sales page for
owned operational software.

The site should be:

- mature
- credible
- precise
- product-aware
- calm under scrutiny
- specific to private, document-heavy operations

It should not default to a blueprint metaphor, square technical panels, heavy
dark gradients, decorative grids, or abstract AI visuals. Those treatments can
appear only when they explain a concrete architecture or workflow.

## Visual System

Use an executive editorial structure:

- a strong first viewport with clear copy and product evidence
- full-width page bands with deliberate contrast
- one or two real product screenshots as proof surfaces
- quiet process diagrams and annotated lists
- generous spacing around major decisions
- denser spacing inside operational evidence

The page should feel composed and inspectable, not decorated.

## Palette

Primary direction:

- Ink: `#0A0D10`
- Near black: `#050708`
- Paper: `#F5F2EC`
- Muted paper: `#E7E0D4`
- Surface: `#12171A`
- Lifted surface: `#182024`
- Primary text on dark: `#F6F8F5`
- Secondary text on dark: `#C4CEC8`
- Primary text on light: `#111614`
- Secondary text on light: `#59625D`
- Action cyan: `#24D7E8`
- Proof green: `#10B981`
- Border dark: `rgba(246, 248, 245, 0.12)`
- Border light: `rgba(17, 22, 20, 0.14)`

Rules:

- Use solid text colors. Do not use gradient text.
- Use cyan for primary actions and selected technical highlights.
- Use green for proof, completion, and control.
- Avoid purple-blue gradient domination.
- Avoid decorative orbs, bokeh, blobs, and spotlight glows.
- Do not make the whole page one-note dark blue, beige, or green.

## Typography

- Primary family: Inter.
- Metadata family: system monospace.
- Use monospace only for short labels, status, and compact metadata.
- Do not set long copy in uppercase.
- Do not use wide tracking for body text.
- Keep body text at 15px or larger.
- Keep line height near 1.5 to 1.7 for body copy.
- Reserve display scale for page-level ideas only.

## Shape And Depth

- Use radius deliberately, usually 8px to 14px.
- Buttons should feel precise, not chunky.
- Cards are acceptable only for repeated proof entries, tools, screenshots, and
  modals.
- Do not nest cards.
- Use shadows only to separate product screenshots from the page, not as
  decoration.

## Components

### Hero

- No hero eyebrow or pill above the H1.
- H1 must remain the first strong signal.
- Primary CTA and secondary CTA must be visible.
- The next section must be visible or clearly hinted.
- Product evidence should appear on desktop.
- The hero should not hide all detail below the fold.

### Sections

- Avoid repeated tiny section numbers as decoration.
- Use headings and rhythm to sequence the page.
- Avoid identical feature-card grids.
- Use tables, sequences, screenshots, and proof panels when they map better to
  the content.
- Make each section do one job.

### Motion

- Motion must clarify state, hierarchy, or flow.
- Content must be visible at rest without animation.
- Respect `prefers-reduced-motion`.
- No decorative pulsing dots, fake cursors, marquees, bounce easing, or image
  hover scaling.

## Impeccable Gate

Before handoff, review against:

- design system drift: fonts, colors, radius, font sizes
- visual details: side-tab accents, glassmorphism, ghost cards, over-rounding
- typography: hero pills, tiny labels, flat hierarchy, overused display tricks
- color: gradient text, radial glow, low contrast, gray text on color
- layout: nested cards, monotonous spacing, overflow, long line length
- motion: decorative pulse, cursor, marquee, bounce, and image scaling
- copy: repeated text, generic AI/SaaS claims, unsupported confidence
- quality: missing images, invisible content, cramped padding, skipped headings
