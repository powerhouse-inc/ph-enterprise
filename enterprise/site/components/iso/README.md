# iso kit

Vendored from the anatomy skill (https://github.com/wheresryan22/anatomy,
commit 1482e84), MIT licence in `LICENSE`. `iso-kit.ts` builds isometric
solids as SVG path strings; `react/draw.tsx` renders them (server-safe) and
`react/live.tsx` has the client hooks for motion.

Figures built with it live in `components/figures/`.

Local changes from upstream, both for the site's lint rules
(`react-hooks/refs`): `useLoop` updates its latest-tick ref in a layout
effect instead of during render, and `useEased` is removed (unused here).
