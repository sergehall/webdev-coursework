import { Link } from "react-router-dom";

import { resetPageScroll } from "../resetPageScroll";

export function CourseOverview() {
  return (
    <>
      <div>
        <Link
          to="/coursework"
          onClick={resetPageScroll}
          className="text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
        >
          ← All coursework
        </Link>
        <p className="mt-7 text-sm font-bold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
          Santa Monica College · Fall 2026
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          ESL 10G
        </h1>
        <p className="mt-2 text-xl text-slate-700 dark:text-slate-200">
          Multiple Skills Preparation: Listening, Speaking & Grammar
        </p>
        <p className="mt-5 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          A low-intermediate course focused on understanding short listening
          passages, communicating about familiar topics, and using English
          grammar with confidence. This page follows the 16-week Fall 2026
          syllabus and collects my class presentations as they become available.
        </p>
      </div>
      <section
        aria-labelledby="course-details-heading"
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 id="course-details-heading" className="sr-only">
          Course information
        </h2>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Instructor
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Matthew Stivener
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Class
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            ESL 10G · Section 2203
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tuesday & Thursday · 9 a.m.–noon
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-300">
            Location
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Business 101
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Santa Monica College
          </p>
        </div>
      </section>
      <section
        aria-labelledby="outcomes-heading"
        className="rounded-2xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/35"
      >
        <h2
          id="outcomes-heading"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          Syllabus overview
        </h2>
        <p className="mt-2 max-w-4xl leading-7 text-slate-700 dark:text-slate-200">
          This low-intermediate course combines listening, speaking, and
          grammar. By the end of the semester, we practice understanding short
          talks, speaking about familiar topics, and forming clear sentences and
          questions.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Listening
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Find main ideas and supporting details, use context to understand
              vocabulary, and take notes on short passages.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Speaking
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Discuss everyday routines and past or future events, and plan and
              deliver a 3–4 minute oral presentation.
            </p>
          </div>
          <div className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/70">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Grammar
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Practice word order, questions, nouns, pronouns, agreement,
              modals, and present, past, and future forms.
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          Coursework includes weekly quizzes, unit tests, speaking assignments,
          journals, Spark homework, participation, and a comprehensive final.
          Check Canvas for current requirements and due dates.
        </p>
      </section>
    </>
  );
}
