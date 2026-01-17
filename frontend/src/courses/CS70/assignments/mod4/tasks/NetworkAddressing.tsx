// frontend/src/courses/CS70/assignments/mod4/tasks/NetworkAddressing.tsx

export default function NetworkAddressing() {
  const dueDate = "Sep 28, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts) — shown in the screenshot as not counting toward grade
    {
      title: "4.1.6 - Lab: Explore Packets and Frames (Practice Only)",
      due: dueDate,
    },
    {
      title: "4.1.7 - Lab: Explore ARP in Wireshark (Practice Only)",
      due: dueDate,
    },
    {
      title: "4.2.9 - Lab: Configure IP Addresses (Practice Only)",
      due: dueDate,
    },
    {
      title: "4.4.5 - Lab: IPv4 Troubleshooting Tools (Practice Only)",
      due: dueDate,
    },
    { title: "4.4.7 - Lab: Use IPv4 Test Tools (Practice Only)", due: dueDate },
    {
      title: "4.5.9 - Lab: Configure an IPv6 Address (Practice Only)",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title:
        "Discussion: The Similarity Between Network Models (OSI & TCP/IP) and Job Hierarchies",
      due: dueDate,
      points: 20,
    },
    {
      title: "Configuring Cisco Switch Using Packet Tracer Simulation",
      due: dueDate,
      points: 20,
    },
    {
      title: "4.3.7 - Lab: Configure IP Networks and Subnets",
      due: dueDate,
      points: 20,
    },
    {
      title: "4.6.4 - Lab: Use ping and tracert on Windows",
      due: dueDate,
      points: 10,
    },
    { title: "4.7 - Module Quiz", due: dueDate, points: 30 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 4 work focused on network addressing. You’ll participate
          in a discussion connecting OSI/TCP-IP models to real-world
          hierarchies, complete a Packet Tracer switch configuration activity,
          configure IP networks and subnets, practice core troubleshooting
          commands (<code>ping</code> and <code>tracert</code>), and finish the
          module quiz. Practice-only labs are available for extra hands-on
          repetition and do not count toward your grade.
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
          <li>
            Complete the discussion on OSI/TCP-IP models and job hierarchies by
            the due date.
          </li>
          <li>
            Finish the Packet Tracer activity: Configuring Cisco Switch Using
            Packet Tracer Simulation.
          </li>
          <li>Submit Lab 4.3.7 (Configure IP Networks and Subnets).</li>
          <li>
            Submit Lab 4.6.4 (Use <code>ping</code> and <code>tracert</code> on
            Windows).
          </li>
          <li>Finish the Week 4 Module Quiz.</li>
          <li>
            (Optional) Complete the practice-only labs for extra
            addressing/troubleshooting practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
