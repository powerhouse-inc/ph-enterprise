# Powerhouse Enterprise Design Standard

This file defines how Powerhouse Enterprise should look and behave before it
ships. It is a practical anti-slop gate for the public site.

## External References

- anti-ui-slop: use as a lens for generic card grids, fake metrics, vague copy,
  decorative gradients, missing states, and interchangeable product UI:
  https://www.skills.sh/site/uizze.com/anti-ui-slop
- Impeccable: use for design context, named critique/polish passes, detector
  checks, browser iteration, and anti-slop patterns:
  https://impeccable.style/docs/
  https://impeccable.style/slop/

## Product-Specific Design Intent

Powerhouse Enterprise should feel:

- quiet
- credible
- technical
- inspectable
- operational
- specific to private workflows

It should not feel:

- like a generic SaaS template
- like a crypto landing page
- like an AI chatbot product
- like a consulting brochure
- like a buffet of unrelated industries

## First-Viewport Rules

The first viewport must answer:

- What is this?
- Who is it for?
- What does it make possible?
- What should I do next?

Required:

- The H1 uses the canonical promise.
- The primary CTA is visible.
- The next section is visible or clearly hinted on desktop and mobile.
- The hero uses product evidence or a concrete system visual, not abstract art.

Forbidden:

- full-screen hero that hides the next section
- decorative gradient-only hero
- fake dashboard mockups
- text trapped inside a marketing card
- large ornamental elements that do not explain the product

## Layout Rules

- Use clear page bands or unframed layouts.
- Do not put UI cards inside other UI cards.
- Do not use card grids when a sequence, table, screenshot, or comparison would
  explain the work better.
- Use fewer sections with stronger hierarchy.
- Keep section titles short and scannable.
- Put detail below the scan line.
- Prefer one strong screenshot over many weak icons.
- Reserve large display type for page-level ideas only.
- Use stable dimensions for fixed-format elements so content does not shift.
- Keep text inside buttons and panels from wrapping awkwardly.

## Visual Hierarchy

Primary:

- H1 and H2
- primary CTA
- proof metrics
- product screenshots

Secondary:

- supporting paragraphs
- section descriptions
- card titles
- navigation links

Tertiary:

- eyebrows
- captions
- metadata
- footnotes

Do not make every element the same visual weight. If everything is important,
the page has no point of view.

## Color

Use the current public-site blueprint palette:

- canvas: `#041322`
- deep canvas: `#020914`
- blueprint lift: `#06233A`
- text primary: `#F8FBFF`
- text secondary: `#C8DDF0`
- text tertiary: `#8FB2CF`
- accent green: `#04C161`
- border: `rgba(170, 210, 240, 0.26)`
- panel: `rgba(4, 19, 34, 0.72)`

Rules:

- Use green as the main action and proof accent.
- Avoid purple-blue gradient domination.
- Avoid decorative orbs, blobs, bokeh, and radial spotlight glows.
- Use solid text colors. Do not use gradient text for headings or metrics.
- Avoid gray text on colored backgrounds unless contrast is verified.
- Do not introduce one-off colors without updating this file.

## Typography

Current type:

- headings and body: Inter
- metadata: system monospace

Rules:

- Use 12, 13, or 14px for labels and metadata.
- Use 16 to 18px for body and supporting copy.
- Use 30 to 52px for section headings.
- Use 38 to 72px for true hero headings.
- Keep letter spacing at `0`.
- Use monospace only for short technical metadata, nav labels, drawing stamps,
  and compact controls.
- Do not set long text in uppercase.
- Do not scale font size with viewport width alone.
- Keep body line length near 45 to 80 characters.
- Use weight and color before adding new type sizes.

## Spacing

Use the 4px scale:

`4, 8, 12, 16, 24, 32, 48, 64, 96`

Rules:

- Spacing within a group must be smaller than spacing between groups.
- Page sections usually need 64 to 96px vertical rhythm on desktop.
- Compact operational surfaces need denser spacing.
- Avoid one-off padding values unless they solve a real alignment problem.

## Radius, Borders, And Depth

- Homepage panels use square corners.
- Buttons use square technical controls.
- Cards and panels on other routes use radius 8px or less unless the local
  design system explicitly says otherwise.
- Borders must be subtle.
- Prefer borders and spacing before shadows.
- Do not pair hairline borders with wide diffuse shadows.
- Shadows should imply depth or focus, not decoration.
- Sticky navigation can use blur and border, but must remain readable.

## Imagery And Product Evidence

Use real product evidence:

- screenshots from existing workflow software
- architecture diagrams that explain a flow
- product surfaces with clear labels
- customer or production artifacts when approved

Avoid:

- abstract 3D shapes as primary proof
- blurred screenshots that cannot be inspected
- generated fake dashboards
- cropped images that hide the useful detail
- decorative screenshots used only as texture

## Components

### Buttons

- Primary CTA uses brand cyan.
- Secondary CTA is quiet and clearly secondary.
- Buttons use icons only when the icon clarifies the action.
- Button text must fit on mobile.
- Links that navigate are links. Actions that mutate state are buttons.

### Cards And Panels

- Cards are for repeated items, proof entries, modals, or framed tools.
- Do not nest cards.
- Do not create decorative feature-card grids just to fill space.
- Use a list, sequence, table, or screenshot when it maps better to the work.

### Metrics

- Use metrics only when attributed.
- Do not create metric soup.
- Pair each number with a plain-language label.
- A screenshot can be stronger proof than a number.

### Navigation

- Navigation labels must be self-evident.
- Hide stale or archived routes from the main nav.
- Keep the primary CTA available.
- Do not expose component names before the prospect understands Powerhouse.

### Motion

- Motion must clarify state, hierarchy, or flow.
- Decorative motion is a liability.
- Respect `prefers-reduced-motion`.
- Avoid blank initial states while animation code loads.

## Anti-UI-Slop Rejection List

Reject or revise:

- hero eyebrow or pill chip above the H1
- repeated tiny section numbers used as decoration
- interchangeable feature card grids
- decorative gradient blobs or orbs
- radial spotlight glows
- thick colored side-tab cards
- cards inside cards
- fake dashboards
- filler metrics
- over-large icons
- vague dashboard labels
- repeated hero-feature-proof templates
- purple-blue gradient dominance
- gradient text
- glassmorphism used as a substitute for hierarchy
- dark-mode glow effects used as decoration
- animations that do not explain state
- decorative pulsing status dots
- fake terminal cursors
- auto-scrolling marquees
- image hover scaling
- bounce or elastic easing on interface elements
- hidden hover-only affordances
- missing focus states
- copy that could belong to any AI tool
- generic SaaS buzzwords
- repeated text inside one component
- em-dash cadence in body copy

## Impeccable Review Loop

Use this loop for future public-page work:

1. Context: read `MESSAGE.md`, `PRODUCT.md`, `DESIGN.md`, and this file.
2. Distill: remove elements that do not explain the product or move a buyer.
3. Typeset: check hierarchy, line length, body size, and label treatment.
4. Layout: check section rhythm, column balance, gutters, and overflow.
5. Clarify: rewrite vague labels and duplicated microcopy.
6. Harden: test long text, mobile, reduced motion, missing images, and errors.
7. Polish: run the final visual pass against screenshots, not memory.

If Impeccable is installed, prefer:

```text
/impeccable critique the homepage
/impeccable polish the homepage
/impeccable audit the homepage
```

## Responsive Rules

Mobile must not be a collapsed desktop page.

Check:

- hero headline wraps cleanly
- CTA group is reachable and not cramped
- screenshots remain legible or are intentionally hidden
- grid layouts become clear stacked sequences
- cards keep stable dimensions
- nav and CTA do not overlap
- next section is visible or hinted from the hero
- no horizontal overflow

## Accessibility Rules

- Use semantic HTML.
- Keep focus states visible.
- Keep normal text at 4.5:1 contrast where practical.
- Use `alt` text for product screenshots that explains the product evidence.
- Do not rely on color alone for meaning.
- Respect reduced motion.
- Test keyboard navigation for all interactive controls.

## Design Review Checklist

Before UI ships, answer yes to each question:

- Does the first viewport explain the proposition?
- Can a prospect scan the page without reading every paragraph?
- Does the page use real product evidence?
- Are archived or unsupported claims hidden from the main journey?
- Are component names introduced only after the platform story?
- Are cards used only where they help?
- Are colors, typography, radius, and spacing consistent?
- Does mobile feel intentionally designed?
- Are empty, loading, hover, focus, and reduced-motion states covered?
- Did browser QA show no overlap, no blank states, no console errors, and no
  horizontal overflow?
