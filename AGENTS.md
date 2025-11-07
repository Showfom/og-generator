# Repository Guidelines

## Project Structure & Module Organization
The app is a Next.js 16 pages-router project. Public web UI and OG API live under `src/pages`; API routes reside in `src/pages/api` (e.g., `/api/image`). Layout templates the renderer uses are under `src/layouts`, each exporting an `ILayout`. Shared building blocks sit in `src/components`, with `src/hooks` for client helpers, `src/styles` for Tailwind + styled-components glue, and `src/types.ts`/`src/constants.ts` for cross-cutting config. Static assets land in `public`, and typed helpers can extend `typings/`. Keep new feature folders inside `src` to preserve tree clarity.

## Build, Test, and Development Commands
- `npm install` – install dependencies declared in `package.json`.
- `npm run dev` – launch the Next dev server with live OG rendering at `http://localhost:3000`.
- `npm run build` – create the production bundle used by the Puppeteer image worker.
- `npm start` – run the compiled app; honors `PORT` (defaults to 3000).
- `npm run clean` – remove `.next` and transient artifacts before a fresh build.
Copy `.env.example` to `.env` before running any command that hits the API.

## Coding Style & Naming Conventions
Use TypeScript everywhere, preferring `.tsx` React components and keeping logic as small, pure functions. Components and layouts use `PascalCase` filenames (`SimpleLayout.tsx`), hooks use `useCamelCase.ts`, and constants/enums remain `UPPER_SNAKE_CASE`. Styling relies on `styled-components` + `twin.macro`; colocate styles within the component file unless shared. Run `npx prettier --write .` before pushing; indentation is two spaces and no semicolons (follow the Prettier defaults already used). Favor composition over inheritance and keep public props typed via interfaces exported from `src/types.ts`.

## Testing Guidelines
There is no committed automated suite yet, so every change must include manual verification notes (route tested, inputs used, and screenshots when touching layouts). If you add runtime logic, add Jest/Playwright coverage under a new `src/__tests__/` folder and wire it into `package.json`. Tests should mirror the `layoutName_action_expected` naming convention (e.g., `simpleLayout_rendersHeadline.spec.ts`) and target both the UI page and `/api/image` HTML output.

## Commit & Pull Request Guidelines
Follow the existing Conventional-style prefixes (`feat:`, `fix:`, `docs:`) visible in `git log`. Keep subject lines under 72 characters and scope narrowly (e.g., `feat: add pattern layout shadows`). PRs must summarize the change, link any issues, list manual verification steps, and include before/after screenshots for UI or image diffs. Mention new env vars and note whether clean installs or migrations are required so deploy agents can plan accordingly.

## Security & Configuration Tips
Do not commit real API keys; all configurable values belong in `.env` and should use the provided `NEXT_PUBLIC_*` names when they must reach the browser. When adding new configuration, document it in `README.md` and sanitize any URLs before echoing them back to users.
