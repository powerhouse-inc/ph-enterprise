# Powerhouse Enterprise Design Context

This file captures the current visual system for agents and Impeccable-style
design review. `DESIGN_STANDARD.md` contains the full release standard.

## Visual Direction

Powerhouse Enterprise uses a dark blueprint system:

- dark technical canvas
- fine measurement grid
- green operational accent
- square panels
- real product screenshots
- mono labels for short metadata only

The result should feel like an inspectable system drawing, not a generic AI
startup page.

## Palette

- Canvas: `#041322`
- Deep canvas: `#020914`
- Blueprint lift: `#06233A`
- Primary text: `#F8FBFF`
- Secondary text: `#C8DDF0`
- Tertiary text: `#8FB2CF`
- Accent green: `#04C161`
- Accent green hover: `#00D46E`
- Border: `rgba(170, 210, 240, 0.26)`
- Panel: `rgba(4, 19, 34, 0.72)`

Rules:

- Use solid text colors. Do not use gradient text.
- Do not use purple-blue gradients on the public homepage.
- Do not use radial spotlight glows or decorative orbs.
- The grid is allowed only when it supports the blueprint/system-drawing
  metaphor.

## Typography

- Primary family: Inter.
- Metadata family: system monospace.
- Use monospace only for short labels, drawing stamps, nav labels, and compact
  technical metadata.
- Do not set long copy in uppercase.
- Do not use wide tracking for body text.
- Keep body text at 14px or larger, preferably 16px to 20px for homepage copy.
- Keep line height near 1.5 to 1.75 for body copy.

## Shape And Depth

- Public homepage panels are square-cornered.
- Avoid rounded feature cards.
- Do not pair hairline borders with wide diffuse shadows.
- Use borders and spacing before shadows.
- Buttons are square technical controls.

## Components

### Hero

- No hero eyebrow or pill above the H1.
- H1 must remain the first strong signal.
- Primary CTA and secondary CTA must be visible.
- The next section must be visible or clearly hinted.
- Product evidence should appear on desktop.

### Sections

- Do not repeat tiny section numbers as decoration.
- Use headings and rhythm to sequence the page.
- Avoid identical card grids.
- Avoid nested cards.
- Use tables, sequences, product screenshots, and proof panels when they map
  better to the content.

### Motion

- No decorative pulsing dots, fake cursors, marquees, bounce easing, or image
  hover scaling.
- Respect `prefers-reduced-motion`.
- Content must be visible at rest without animation.

## Impeccable Gate

Before handoff, review against:

- design system drift: fonts, colors, radius, font sizes
- visual details: side-tab accents, glassmorphism, ghost cards, over-rounding
- typography: hero pills, tiny labels, flat hierarchy, overused display tricks
- color: gradient text, radial glow, low contrast, gray text on color
- layout: nested cards, monotonous spacing, overflow, long line length
- motion: decorative pulse/cursor/marquee/bounce/image scaling
- copy: repeated text, em-dash cadence, generic SaaS buzzwords, aphorisms
- quality: missing images, invisible content, cramped padding, skipped headings

