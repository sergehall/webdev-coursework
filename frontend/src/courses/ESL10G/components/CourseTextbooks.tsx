import { courseBooks } from "../data/courseBooks";

export function CourseTextbooks() {
  return (
    <section aria-labelledby="course-books-heading">
      <div className="mb-5">
        <h2
          id="course-books-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
        >
          Course textbooks
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Textbooks selected by the instructor for ESL 10G.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {courseBooks.map((book) => (
          <a
            key={book.isbn}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${book.title} on the publisher's website (opens in a new tab)`}
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:flex-row dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-500"
          >
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="h-32 w-24 shrink-0 self-start rounded-md border border-slate-200 object-contain shadow-sm sm:h-44 sm:w-32 dark:border-slate-700"
              loading="lazy"
            />
            <div className="min-w-0">
              <h3 className="text-lg leading-snug font-bold text-slate-900 dark:text-white">
                {book.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                {book.edition}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {book.authors}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {book.publisher} · © {book.year}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                ISBN: {book.isbn}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
