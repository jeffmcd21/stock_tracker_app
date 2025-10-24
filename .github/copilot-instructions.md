<!-- .github/copilot-instructions.md -->
# Copilot / AI agent instructions — stock_tracker_app

Purpose: give an AI coding assistant the minimal, high-value context needed to be productive in this repository.

- Project type: Next.js (App Router) + TypeScript + TailwindCSS. App code lives in the `app/` directory (app-router). See `app/(root)/page.tsx` and `app/layout.tsx`.
- Run / build: use the npm scripts in `package.json`:
  - Start dev server: `npm run dev` (uses `next dev --turbopack`, default port 3000)
  - Build: `npm run build` (uses turbopack)
  - Start production server: `npm run start`
  - Lint: `npm run lint` (eslint)

Key architecture & conventions (what to know and where to look):

- App router / server vs client components:
  - The project uses the Next.js app directory. Files under `app/` are server components by default. When a component needs browser APIs or state/useEffect, it includes a top-line `'use client'` (see `components/ui/TradingViewWidget.tsx` and `hooks/useTradingViewWidget.tsx`). Follow that pattern: add `'use client'` only when necessary.

- UI primitives and patterns:
  - Shared UI building blocks live in `components/ui/` (e.g., `button.tsx`, `input.tsx`, `dropdown-menu.tsx`). Prefer reusing these primitives rather than creating ad-hoc HTML + classes.
  - Form field wrappers are in `components/forms/` (e.g., `InputField.tsx`, `SelectField.tsx`). The project uses `react-hook-form`.
  - Common helper `cn` for className merging is in `lib/utils.ts`. Use it for combining Tailwind classes consistently.

- TradingView integration (core domain integration):
  - Embeds are rendered by `components/ui/TradingViewWidget.tsx` (client component, memoized). The business-config objects are in `lib/constants.ts` (e.g., `MARKET_OVERVIEW_WIDGET_CONFIG`, `HEATMAP_WIDGET_CONFIG`).
  - The DOM script injection hook is `hooks/useTradingViewWidget.tsx`. If you need to change widget behavior, edit the hook or the config in `lib/constants.ts`.

- Routing & auth flows:
  - Auth-related pages are grouped under `app/(auth)/` (e.g., `app/(auth)/sign-in/page.tsx`, `sign-up`). Keep auth UI inside this route-group.

- Static assets & images:
  - Public assets under `public/assets/` (icons & images). Use `/assets/...` paths from the app.

- Types & globals:
  - Custom/global types are in `types/global.d.ts`. Add small project types there if needed.

Practical editing tips for agents:

- When adding a client component: add `'use client'` at top, import React hooks explicitly, and keep the component in `components/ui/` (or a feature folder) and default-export it (follow existing file names and casing).
- When adding UI styles: use existing Tailwind classes and helper `cn()`; do not introduce new CSS frameworks.
- When modifying TradingView widgets: update `lib/constants.ts` for config changes and keep the embed logic in `hooks/useTradingViewWidget.tsx` and `TradingViewWidget.tsx`.
- When adding routes: create a folder under `app/`, place a `page.tsx` file and respect server/client component split.

Debugging & developer workflow notes:

- Dev server: `npm run dev`. Browse to http://localhost:3000.
- Lint: `npm run lint` (eslint configured via `eslint-config-next`).
- There are no test scripts in package.json; add tests with a new script if required.

Files to inspect for any change pull request:

- `app/(root)/page.tsx` — dashboard composition and TradingView usage examples.
- `components/ui/TradingViewWidget.tsx` and `hooks/useTradingViewWidget.tsx` — how client embeds are implemented.
- `lib/constants.ts` — all TradingView and form option configurations live here.
- `components/ui/*` and `components/forms/*` — UI primitives and form wrappers.
- `types/global.d.ts` — global types to keep module scope consistent.

When unsure, prefer minimal, local changes and a short PR description linking to the exact file(s) changed. If a change touches layout, mention performance and rendering intent (server vs client) in the PR body.

If anything here is ambiguous or you want the guidance adapted (more/less detail, include examples for code-gen, or add code style rules), ask and I will refine this file.
