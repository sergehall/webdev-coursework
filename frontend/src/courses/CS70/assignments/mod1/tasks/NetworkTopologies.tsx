// frontend/src/courses/CS70/assignments/mod1/tasks/NetworkTopologies.tsx

export default function NetworkTopologies() {
  const dueDate = "Sep 7, 2025";

  const ungradedItems = [
    {
      title: "Survey #1",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    { title: "Syllabus and Netiquette", due: dueDate, points: 10 },
    { title: "Discussion: Meet & Greet", due: dueDate, points: 20 },
    {
      title: "1.1.7 - Lab: Create Network Topologies",
      due: dueDate,
      points: 5,
    },
    {
      title: "1.3.9 - Lab: Create a Home Wireless Network",
      due: dueDate,
      points: 5,
    },
    {
      title: "1.4.10 - Lab: Troubleshooting Methodology",
      due: dueDate,
      points: 10,
    },
    { title: "1.5 - Module Quiz", due: dueDate, points: 20 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 1 onboarding tasks and graded work for CS 70. You’ll
          review the syllabus and netiquette rules, introduce yourself in the
          discussion, and complete labs focused on basic network topologies,
          home wireless networking, and troubleshooting methodology.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          This Week’s Items
        </h3>

        <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
          <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
            <strong>Ungraded / Checklist</strong>
          </p>

          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {ungradedItems.map((item) => (
              <li key={item.title}>
                {item.title} <span className="text-gray-500">({item.due})</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm leading-relaxed text-gray-900 dark:text-gray-100">
            <strong>Graded Assignments for this Week</strong>
          </p>

          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {gradedAssignments.map((a) => (
              <li key={a.title}>
                {a.title}{" "}
                <span className="text-gray-500">
                  ({a.due} • {a.points} pts)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Complete the Week 1 survey by the due date.</li>
          <li>Read and submit the “Syllabus and Netiquette” assignment.</li>
          <li>Post in “Discussion: Meet &amp; Greet” and follow netiquette.</li>
          <li>
            Submit the labs: Network Topologies, Home Wireless Network, and
            Troubleshooting Methodology.
          </li>
          <li>Finish the Week 1 Module Quiz.</li>
        </ul>
      </div>
    </div>
  );
}
