# Powerhouse Enterprise Design Standard

This file defines how Powerhouse Enterprise should look and behave before it
ships. It is a practical anti-slop gate for the public site.

## External References

- anti-ui-slop: use as a lens for generic card grids, fake metrics, vague copy,
  decorative gradients, missing states, and interchangeable product UI:
  https://www.skills.sh/site/uizze.com/anti-ui-slop
- Impeccable: use for design context, critique, polish, detector checks, and
  browser-based iteration when installed:
  https://impeccable.style/docs/

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

Use the established Powerhouse palette:

- background: `#0B0D0F`
- surface: `#141719`
- lifted surface: `#1A1D22`
- text primary: `#F3F5F7`
- brand cyan: `#00D4FF`
- brand purple: `#7A3AFF`

Rules:

- Use cyan as the main action and proof accent.
- Use purple sparingly.
- Avoid purple-blue gradient domination.
- Avoid decorative orbs, blobs, and bokeh backgrounds.
- Avoid gray text on colored backgrounds unless contrast is verified.
- Do not introduce one-off colors without updating this file.

## Typography

Current type:

- headings: Poppins
- body: Inter

Rules:

- Use 12, 13, or 14px for labels and metadata.
- Use 16 to 18px for body and supporting copy.
- Use 30 to 52px for section headings.
- Use 38 to 72px for true hero headings.
- Keep letter spacing at `0`.
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

- Cards and panels use radius 8px or less.
- Buttons use a modest radius.
- Borders must be subtle.
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

- interchangeable feature card grids
- decorative gradient blobs or orbs
- thick colored side-tab cards
- cards inside cards
- fake dashboards
- filler metrics
- over-large icons
- vague dashboard labels
- repeated hero-feature-proof templates
- purple-blue gradient dominance
- glassmorphism used as a substitute for hierarchy
- animations that do not explain state
- hidden hover-only affordances
- missing focus states
- copy that could belong to any AI tool

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

