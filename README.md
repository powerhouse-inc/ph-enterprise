# Powerhouse Enterprise

Marketing kit and public site for [enterprise.powerhouse.io](https://enterprise.powerhouse.io).

Canonical promise: **Turn workflows into software you own.**

## Repository structure

```
enterprise/
├── 01.brief/           # Strategic foundation — audience, emotional drivers, SWOT, vendor checklist
├── 02.messaging/       # Homepage copy (v1–v7) + product subpages
│   └── subpages/       # Clint, Fusion, Connect, Switchboard, Renown
├── 03.design-system/   # Color tokens, typography, logos, illustrations, style guide, templates
├── 04.site-prototypes/ # Three iterations of static HTML prototypes
├── 05.deck/            # Sales/investor deck with slide assets
└── site/               # Production Next.js landing page
```

## Site

The production landing page lives in `enterprise/site/`. Built with:

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS 4** + PostCSS
- **GSAP 3** + ScrollTrigger (scroll-triggered animations)
- **Lenis** (smooth scrolling)

### Running locally

```bash
cd enterprise/site
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Building

```bash
npm run build
```

## Messaging

The canonical positioning is `MESSAGE.md`. It targets operations and technology leaders responsible for valuable, private, document-heavy workflows spread across documents, spreadsheets, inboxes, and legacy systems.

The site funnels to [bai.powerhouse.io](https://bai.powerhouse.io) for the BAI five-day workflow assessment and first-workflow engagement.

## Deslop standards

Use these files before shipping new copy or UI:

- `PRODUCT.md` - product context for Impeccable-style design work
- `DESIGN.md` - current visual system context for Impeccable-style design work
- `COPY_STANDARD.md` - controlled-language, proof, terminology, and anti-AI-writing rules
- `DESIGN_STANDARD.md` - visual hierarchy, UI quality, responsive, and anti-generic-design rules
- `DESLOP_CHECKLIST.md` - pre-release checklist for copy, design, routes, metadata, build, and browser QA
- `DESLOP_REPORT.md` - live audit log for findings, decisions, and remaining risks

## Design system

`03.design-system/` contains the full brand identity:

- **Current public-site direction**: dark blueprint canvas, green operational accent, square technical panels, and real product evidence
- **Legacy brand kit**: Cyan (#00D4FF) + Purple (#7A3AFF) gradient accent on dark (#0B0D0F) backgrounds
- **Typography**: Inter for the current public site; older assets may still use Inter + Poppins
- **Logos**: Powerhouse parent brand + Clint, Fusion, Connect, Switchboard, Renown, Vetra, Achra sub-brands
- **Illustrations**: Halftone sphere, crystalline, dithered cyan icon, electric flow, and more
