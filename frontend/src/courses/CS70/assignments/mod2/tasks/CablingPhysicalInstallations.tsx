// frontend/src/courses/CS70/assignments/mod2/tasks/CablingPhysicalInstallations.tsx

export default function CablingPhysicalInstallations() {
  const dueDate = "Sep 14, 2025";

  // The Week 2 screenshot shows only graded items
  const ungradedItems: Array<{ title: string; due: string }> = [];

  const gradedAssignments = [
    { title: "Discussion: Noise & Error", due: dueDate, points: 20 },
    { title: "Install and Use Cisco Packet Tracer", due: dueDate, points: 10 },
    {
      title: "2.6.11 - Lab: Explore Physical Connectivity 2",
      due: dueDate,
      points: 10,
    },
    {
      title: "2.6.14 - Lab: Troubleshoot Physical Connectivity 3",
      due: dueDate,
      points: 10,
    },
    { title: "2.7 - Module Quiz", due: dueDate, points: 30 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 2 graded work for CS 70 focused on cabling and physical
          installations. You’ll participate in the “Noise &amp; Error”
          discussion, install and use Cisco Packet Tracer, and finish hands-on
          labs related to physical connectivity and troubleshooting.
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

          {ungradedItems.length === 0 ? (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              No ungraded items listed for this week.
            </p>
          ) : (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {ungradedItems.map((item) => (
                <li key={item.title}>
                  {item.title}{" "}
                  <span className="text-gray-500">({item.due})</span>
                </li>
              ))}
            </ul>
          )}

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
          <li>Complete the “Discussion: Noise &amp; Error” by the due date.</li>
          <li>Install and use Cisco Packet Tracer as required for labs.</li>
          <li>Submit Lab 2.6.11 (Explore Physical Connectivity 2).</li>
          <li>Submit Lab 2.6.14 (Troubleshoot Physical Connectivity 3).</li>
          <li>Finish the Week 2 Module Quiz.</li>
        </ul>
      </div>
    </div>
  );
}
