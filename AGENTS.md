# AGENTS.md

## Build/Lint/Test Commands
- Dev: `pnpm dev` (with Turbopack)
- Build: `pnpm build`
- Start: `pnpm start`
- Analyze: `pnpm analyze` (bundle analyzer)
- Types: `pnpm types:check`
- Debug: `pnpm debug` (with inspector)
- No test runner configured; use `pnpm build` for validation.

## Architecture & Structure
Bilingual (zh/en) Next.js 15 app using Nextra 4 for docs, Tailwind CSS 4 for styling.
- Content: `content/{locale}/{topic}/` with `_meta.js` for navigation.
- I18n: Middleware-based, locales in `app/_dictionaries/`.
- Routing: Dynamic via `app/[lang]/[[...mdxPath]]/page.tsx`, SSG with Nextra.
- Search: Pagefind generates index post-build to `public/_pagefind`.
- SVG: Custom webpack config for @svgr/webpack in `app/_icons/`.
- No databases; static site with MDX content.

## Code Style Guidelines
- Use TypeScript with strict types.
- Imports: ES modules, absolute paths where possible.
- Naming: Kebab-case for files, camelCase for variables/functions.
- Formatting: Tailwind classes, consistent indentation.
- Error handling: Ignore ESLint during builds; use try/catch for runtime.
- Interview answers: One question per file, H3 headings, numbered lists, SVG diagrams inline.
- Follow CLAUDE.md and GEMINI.md for detailed conventions (e.g., MDX features, i18n structure).
