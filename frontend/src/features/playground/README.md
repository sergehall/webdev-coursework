# Code Playground

The Playground owns the browser-only execution flow for uploaded and course-linked code.

- `application/` coordinates file loading, worker lifecycles, iframe messages, and the current session.
- `components/` contains the status, console, and upload controls used by `PlaygroundWorkspace`.
- `infrastructure/` validates paths and source files, fetches course materials, and creates restricted iframe previews. Keep security checks at these boundaries.
- `PlaygroundWorkspace.tsx` and `PlaygroundHero.tsx` compose the feature UI. The route remains in `pages/CodePlaygroundLabPage.tsx`.

Generic buttons and course-facing links stay in `components/buttons/` because other features use them. The worker scripts and downloadable course files remain in `public/` so their existing URLs and sandbox behavior are preserved. Add new Playground-only code to this feature instead of the top-level `hooks/`, `utils/`, or `components/` folders.

Worker network restrictions are enforced by the CSP on each worker script's HTTP
response, independently of the page CSP. `worker-content-security-policy.ts`
configures Vite development/preview; `vercel.json` carries equivalent production
headers. JavaScript workers cannot connect to any network destination or import
scripts. Python workers may load only the pinned Pyodide runtime directory on
jsDelivr. Neither may spawn additional workers. Preserve these headers when
changing hosting; never serve these workers through a generic static host without
their policy. See [MDN's worker CSP documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#content_security_policy).

Source filters and JavaScript global shadows are educational diagnostics, not
a complete sandbox. CSP contains network access but does not partition
same-origin IndexedDB, CacheStorage or origin-private files. The application
currently keeps account cookies HttpOnly and practice state in localStorage,
which dedicated workers cannot read directly. Do not add sensitive worker-accessible
storage without moving execution to an opaque or dedicated cookieless origin.
