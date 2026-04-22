// frontend/src/courses/CS79D/assignments/mod1/tasks/CourseIntroduction.tsx

export default function CourseIntroduction() {
  const items = [
    { title: "Welcome to CS 79D!", downloadable: false },
    { title: "Academic Honesty Policy", downloadable: false },
    { title: "Santa Monica College Honor Code", downloadable: false },
    { title: "Spring 2026 Academic Calendar", downloadable: false },
    { title: "AWS Security Overview", downloadable: false },
    { title: "Course Syllabus", downloadable: false },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">CS 79D – Course Introduction</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Use this section to get started with CS 79D. Review the welcome message,
        course policies, academic integrity guidelines, and syllabus before
        beginning Week 1 deliverables.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Course Introduction Resources
        </h3>

        <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/30 p-4">
          <p className="text-lg font-semibold text-blue-100">
            📘 Course Syllabus — CS 79D
          </p>
          <p className="mt-1 text-sm text-blue-200">
            Read the syllabus carefully for policies, grading, weekly
            expectations, and participation requirements.
          </p>
        </div>

        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                {item.downloadable ? "📘" : "•"}
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
