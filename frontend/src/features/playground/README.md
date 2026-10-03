# Code Playground

The Playground owns the browser-only execution flow for uploaded and course-linked code.

- `application/` coordinates file loading, worker lifecycles, iframe messages, and the current session.
- `components/` contains the status, console, and upload controls used by `PlaygroundWorkspace`.
- `infrastructure/` validates paths and source files, fetches course materials, and creates restricted iframe previews. Keep security checks at these boundaries.
- `PlaygroundWorkspace.tsx` and `PlaygroundHero.tsx` compose the feature UI. The route remains in `pages/CodePlaygroundLabPage.tsx`.

Generic buttons and course-facing links stay in `components/buttons/` because other features use them. The worker scripts and downloadable course files remain in `public/` so their existing URLs and sandbox behavior are preserved. Add new Playground-only code to this feature instead of the top-level `hooks/`, `utils/`, or `components/` folders.
