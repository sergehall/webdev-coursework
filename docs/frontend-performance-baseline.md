# Frontend performance baseline — 2026-10-03

The application remains on React and Vite. The [PageSpeed Insights report](https://pagespeed.web.dev/analysis/https-webdev-coursework-com/sdrpmpre1o?form_factor=mobile) measured the previously deployed site: mobile performance 76 (FCP 4.0 s, LCP 4.1 s, TBT 0 ms, CLS 0); desktop performance 96 (FCP/LCP 0.8 s, TBT 0 ms, CLS 0.096). The mobile report had no field data, so its timings are Lighthouse lab results. Its largest actionable findings were unused course JavaScript on the home route and oversized project card images.

For a repeatable local comparison, build the production bundle with `yarn workspace frontend build:bundle`, serve it with `yarn workspace frontend preview`, then load each route in a fresh headless Chrome tab with cache disabled. The numbers below are transferred JS and CSS KiB, including HTTP overhead. They measure the local build rather than a simulated mobile network and must not be compared directly to Lighthouse timings.

| Route | Before | After | Change |
| --- | ---: | ---: | ---: |
| `/` | 494 KiB | 257 KiB | −48% |
| `/projects` | 498 KiB | 214 KiB | −57% |
| `/code-playground` | 485 KiB | 202 KiB | −58% |
| `/coursework/CS60/assignment/1` | 534 KiB | 293 KiB | −45% |

The old `manualChunks` configuration made the entry document preload unrelated course bundles. Vite's default splitting now keeps course code behind its lazy routes. The production HTML has no course preload links. The two project screenshots named by Lighthouse now have card-sized WebP versions, about 17 KiB each; the original images remain available for the full-size dialog. The shared route loading state reserves space while lazy pages resolve. In the local 800×600 Chrome run, the footer-related CLS on the four routes dropped from 0.14–0.18 to 0. Local FCP/LCP timings did not materially change in this fast environment.

The common API client now omits the JSON content type from bodyless GET requests, which avoids that header causing a cross-origin preflight. It also handles empty successful responses and distinguishes caller cancellation from timeout. This is covered by unit tests; API latency was not benchmarked because the backend was not running during the local comparison.

The largest remaining frontend transfer is the entry JavaScript bundle (about 150 KiB transferred locally) and global CSS (about 32 KiB). After deployment, rerun PageSpeed on both form factors and inspect the new unused-JavaScript list, LCP breakdown, and layout shifts. Use that evidence to choose the next split or CSS/image change; the old report cannot verify this build's production score.
