# Powerhouse Enterprise

Marketing kit and landing page for [enterprise.powerhouse.io](https://enterprise.powerhouse.io) — AI-native operations infrastructure for industries where data confidentiality is non-negotiable.

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

The latest copy is `02.messaging/v7.md`. It targets CTOs / VPs of Engineering at organizations in legal, HR, finance, and procurement where data privacy is a non-negotiable requirement.

The site funnels to [bai.powerhouse.io](https://bai.powerhouse.io) for AI readiness assessments and engagement.

## Design system

`03.design-system/` contains the full brand identity:

- **Colors**: Cyan (#00D4FF) + Purple (#7A3AFF) gradient accent on dark (#0B0D0F) backgrounds
- **Typography**: Inter (body) + Poppins (headings)
- **Logos**: Powerhouse parent brand + Clint, Fusion, Connect, Switchboard, Renown, Vetra, Achra sub-brands
- **Illustrations**: Halftone sphere, crystalline, dithered cyan icon, electric flow, and more
