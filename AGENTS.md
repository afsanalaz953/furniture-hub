<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository notes

Small single-package Next.js app (ecommerce, WIP). No monorepo, no TypeScript, no tests.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint (`eslint-config-next/core-web-vitals`)
- `npm run build` / `npm run start`
- No test, typecheck, or format scripts exist. Don't invent one.

## Stack quirks

- Next.js 16 App Router, plain JavaScript (`.js`/`.jsx` mixed). No `tsconfig`.
- Path alias: `@/*` → `./src/*` (in `jsconfig.json`).
- Tailwind **v4** (CSS-first config): no `tailwind.config.js`. Plugins are declared in `src/app/globals.css` via `@plugin "daisyui"`. The Tailwind loader is wired through the custom `turbopack.rules` entry in `next.config.mjs` — don't add PostCSS config, and note Turbopack is required for styles.
- Auth is [better-auth](https://www.better-auth.com):
  - Server config: `src/lib/auth.js` (MongoDB adapter via `@better-auth/mongo-adapter`; DB name `"bazar-dor"` is hardcoded there)
  - Client: `src/lib/auth-client.js` (`better-auth/react`)
  - Catch-all handler: `src/app/api/auth/[...all]/route.js` — new auth endpoints appear automatically; don't add routes for them.

## Environment

`.env` (gitignored) is required for auth to work: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URL`. Without it, `src/lib/auth.js` constructs a `MongoClient` with an undefined URL and requests fail at runtime.

Gotcha: `src/lib/auth-client.js` reads `process.env.BETTER_AUTH_URL` in client-side code, where non-`NEXT_PUBLIC_` env vars are undefined. It happens to work because `baseURL` is optional same-origin; when touching this, don't copy the pattern — use a `NEXT_PUBLIC_` var or omit `baseURL`.

## Codebase state

- App is early-stage: home page is a stub; `signin`/`signup` pages are client components with social login and `react-hot-toast` code intentionally commented out — don't "clean it up" by deleting or enabling it without being asked.
- No middleware, no server actions, no data-fetching layer yet.
