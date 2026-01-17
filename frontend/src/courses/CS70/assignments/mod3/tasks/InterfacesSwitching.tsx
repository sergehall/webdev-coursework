// frontend/src/courses/CS70/assignments/mod3/tasks/InterfacesSwitching.tsx

export default function InterfacesSwitching() {
  const dueDate = "Sep 21, 2025";

  const ungradedItems = [
    { title: "Survey #2", due: dueDate },

    // Practice-only labs (0 pts) — shown in the screenshot as not counting toward grade
    {
      title:
        "3.1.8 - Lab: Select and Install a Network Adapter (Practice Only)",
      due: dueDate,
    },
    {
      title: "3.1.9 - Lab: Connect a Media Converter (Practice Only)",
      due: dueDate,
    },
    { title: "3.2.8 - Lab: Secure a Switch (Practice Only)", due: dueDate },
    {
      title: "3.3.6 - Lab: Configure Port Aggregation (Practice Only)",
      due: dueDate,
    },
    { title: "3.3.8 - Lab: Configure PoE (Practice Only)", due: dueDate },
    {
      title: "3.4.8 - Lab: Troubleshoot Disabled Ports (Practice Only)",
      due: dueDate,
    },
    { title: "3.4.9 - Lab: Switching Loop (Practice Only)", due: dueDate },
  ];

  const gradedAssignments = [
    {
      title: "3.2.7 - Lab: Install a Switch in the Rack",
      due: dueDate,
      points: 10,
    },
    { title: "3.2.9 - Lab: Cisco IOS Basics", due: dueDate, points: 5 },
    {
      title: "3.3.7 - Lab: Enable Jumbo Frame Support",
      due: dueDate,
      points: 5,
    },
    { title: "3.5 - Module Quiz", due: dueDate, points: 20 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 3 work focused on network interfaces and switching.
          You’ll complete the graded switch labs, review IOS basics, enable
          jumbo frames, and finish the module quiz. Practice-only labs are
          available for extra hands-on repetition and do not count toward your
          grade.
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
          <li>Complete Survey #2 by the due date.</li>
          <li>
            Submit the graded labs: Install a Switch in the Rack, Cisco IOS
            Basics, and Enable Jumbo Frame Support.
          </li>
          <li>Finish the Week 3 Module Quiz.</li>
          <li>
            (Optional) Work through the practice-only labs for additional
            troubleshooting and configuration practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
