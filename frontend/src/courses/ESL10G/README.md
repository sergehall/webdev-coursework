# ESL 10G course pages

`ESL10GPage.tsx` composes the coursework page and preserves the named
`ESL10GPresentationPage` export used by lazy routing and the existing tests.
The course uses React Router and Vite; its presentation is local to this course.

## Course content

- `components/CourseOverview.tsx`: course introduction, instructor, schedule,
  location, and syllabus summary.
- `components/CourseTextbooks.tsx` and `data/courseBooks.ts`: textbook cards and
  their bibliographic data.
- `components/CourseOutline.tsx`: the existing 16-week outline and presentation
  entry actions.
- `components/PresentationTextModal.tsx`: transcript preview and original PDF.
- `courseContent.ts`: the unchanged weeks, transcript, and ordered slides.
- `resetPageScroll.ts`: scroll reset shared by course navigation links.

## Presentation

`presentation/ESL10GPresentationPage.tsx` owns the route shell and QR visit
tracking. `presentation/components/PresentationViewer.tsx` composes the viewer.
Its audio and video elements remain mounted across slide changes.

Presentation components separate the stage, opening/closing slides, SVG
annotations, controls, elapsed-time progress, and playback guidance. They use
explicit props and preserve the original DOM structure, labels, and styling.

`presentation/application/` owns browser behavior:

- `usePresentationPlayback.ts`: playback state, timer, race-aware native view
  transitions, restart, keyboard navigation, and horizontal swipes. It composes
  the audio, media, and fullscreen hooks.
- `usePresentationAudio.ts`: opt-in music, volume, crossfade, and cleanup.
- `usePresentationMedia.ts`: bounded image preloading and slide-aware video.
- `usePresentationFullscreen.ts`: native fullscreen and the visible-viewport
  fallback used by unsupported or rejecting browsers.

`presentation/domain/playback.ts` contains playback and slide contracts, the
initial playback state, and elapsed-time formatting. `presentation/config.ts`
contains the existing timings, asset URLs, and slide metadata.

`presentation-bookends.css` and public course materials remain in their existing
locations. Components do not add wrapping DOM nodes just to separate files.

## Validation

`ESL10GPage.test.tsx` keeps the original suite name, media mocks, cleanup, and
registration order. `tests/renderPage.tsx` provides the shared two-route render
helper. The behavior cases are grouped under `tests/`:

- `course-page.cases.tsx`: course content, transcript/PDF links, and route entry.
- `media.cases.tsx`: image preloading and video lifecycle.
- `navigation.cases.tsx`: buttons, keyboard, touch, and native transitions.
- `visuals.cases.tsx`: photos and slide-specific annotations.
- `controls.cases.tsx`: subtitles, music, and playback guidance.
- `playback.cases.tsx`: timed progression, pause, restart, and speaking progress.
- `fullscreen.cases.tsx`: native/fallback fullscreen and viewport resize.

Case modules register tests through the entry file so Vitest runs each case
once. The original 23 test names and their order remain unchanged. The case
modules and router helper are excluded from application coverage in
`frontend/vite.config.ts`.
The additional `presentation/application/usePresentationPlayback.test.tsx`
protects immediate navigation when reduced motion is requested.

```sh
yarn workspace frontend test src/courses/ESL10G
yarn workspace frontend typecheck
yarn node scripts/run-eslint.mjs frontend src/courses/ESL10G
yarn workspace frontend build:bundle
```

For presentation changes, verify both real routes, mobile/tablet/desktop layouts,
light/dark themes, media controls, and fullscreen fallback. Preserve transcript,
slide order, teaching content, asset URLs, and QR analytics behavior.
