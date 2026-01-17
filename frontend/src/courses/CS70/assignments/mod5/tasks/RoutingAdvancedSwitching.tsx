// frontend/src/courses/CS70/assignments/mod5/tasks/RoutingAdvancedSwitching.tsx

export default function RoutingAdvancedSwitching() {
  const dueDate = "Oct 5, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts) — shown in the screenshot as not counting toward grade
    {
      title: "5.6.8 - Lab: Configure Switch IP and VLAN - GUI (Practice Only)",
      due: dueDate,
    },
    {
      title: "5.6.11 - Lab: Configure Switch IP Settings - CLI (Practice Only)",
      due: dueDate,
    },
    { title: "5.3.4 - Lab: Configure NAT (Practice Only)", due: dueDate },
    { title: "5.6.9 - Lab: Create VLANs - GUI (Practice Only)", due: dueDate },
  ];

  const gradedAssignments = [
    {
      title: "5.1.9 - Lab: Install an Enterprise Router",
      due: dueDate,
      points: 10,
    },
    {
      title: "5.1.10 - Lab: Cisco Troubleshooting Tools",
      due: dueDate,
      points: 10,
    },
    {
      title: "5.5.4 - Lab: Create a Three-Tier Network",
      due: dueDate,
      points: 10,
    },
    { title: "5.8 - Module Quiz", due: dueDate, points: 30 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 5 work focused on routing and advanced switching
          concepts. You’ll install an enterprise router, use Cisco
          troubleshooting tools, build a three-tier network, and finish the
          module quiz. Practice-only labs are available for additional VLAN/NAT
          and switch configuration practice and do not count toward your grade.
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
          <li>Submit Lab 5.1.9 (Install an Enterprise Router).</li>
          <li>Submit Lab 5.1.10 (Cisco Troubleshooting Tools).</li>
          <li>Submit Lab 5.5.4 (Create a Three-Tier Network).</li>
          <li>Finish the Week 5 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs for extra experience with
            VLANs, NAT, and switch IP configuration.
          </li>
        </ul>
      </div>
    </div>
  );
}
