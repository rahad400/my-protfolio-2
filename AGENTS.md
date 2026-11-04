<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository notes

## Stack

- Next.js 16.4.5 App Router, React 19.3, TypeScript strict mode.
- Single package, no monorepo. Routes and UI live in `src/app`; static assets in `public/`.
- Tailwind CSS v4 and React Compiler are enabled in `next.config.ts`.

## Commands

Use npm; `package-lock.json` is the lockfile.

- `npm run dev` — dev server at http://localhost:3000. Turbopack is the default; do not add `--turbopack`.
- `npm run build` / `npm start` — production build and serve.
- `npm run lint` — ESLint CLI (`next lint` no longer exists in Next.js 16).
- `npx next typegen`, then `npx tsc --noEmit` — typecheck. `typegen` must run first so the generated route types and `next-env.d.ts` exist.
- No test runner or test script is configured.

## Repo-specific gotchas

- Use the `@/*` alias for imports from `src/*`.
- Route props use generated global helpers such as `LayoutProps<"/">` and `PageProps<"/[slug]">`; do not hand-write `params`/`searchParams` types.
- Tailwind is CSS-first: theme tokens belong in `src/app/globals.css` via `@theme`; there is no `tailwind.config.*`.
- Do not add a PostCSS config for Tailwind. `next.config.ts` routes every `*.css` file through the `@tailwindcss/turbopack` loader, so styles require the Turbopack pipeline.
- Edit only outside the `nextjs-agent-rules` block above; `next dev` regenerates that block.
- `src/app/page.tsx` composes `components/sections/*`; `src/components/home/Hero.tsx` is a stale duplicate — do not edit or import it.
- Content lives in `src/data/` (`projects.ts`, `skills.ts`, `contact.ts`) — edit data there, not in the section components.
