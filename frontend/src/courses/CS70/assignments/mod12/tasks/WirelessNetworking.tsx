// frontend/src/courses/CS70/assignments/mod12/tasks/WirelessNetworking.tsx

export default function WirelessNetworking() {
  const dueDate = "Nov 23, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts)
    {
      title:
        "12.3.11 - Lab: Enable Wireless Intrusion Prevention (Practice Only)",
      due: dueDate,
    },
    {
      title:
        "12.4.8 - Lab: Troubleshoot Wireless Network Problems (Practice Only)",
      due: dueDate,
    },

    // Lab demos + lecture
    { title: "Lab Demos: Lab Demo Ch. 12", due: dueDate },
    { title: "Lectures: Lecture Ch. 12", due: dueDate },

    // Readings
    { title: "Read Ch12 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "12.1 - Wireless Concepts and Standards: Read subsections from 12.1.1 to 12.1.8",
      due: dueDate,
    },
    {
      title:
        "12.2 - Enterprise Wireless Network Design: Read subsections from 12.2.1 to 12.2.7",
      due: dueDate,
    },
    {
      title: "12.3 - Wireless Security: Read subsections from 12.3.1 to 12.3.6",
      due: dueDate,
    },
    {
      title:
        "12.4 - Wireless Troubleshooting: Read subsections from 12.4. to 12.4.6",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 4 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title: "Discussion: Ethernet- Wired Connections",
      due: dueDate,
      points: 20,
    },
    {
      title: "12.3.9 - Lab: Secure an Enterprise Wireless Network",
      due: dueDate,
      points: 10,
    },
    {
      title: "12.4.7 - Lab: Explore Wireless Network Problems",
      due: dueDate,
      points: 10,
    },
    { title: "12.5 - Module Quiz", due: dueDate, points: 20 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 12 work focused on wireless networking. You’ll review
          the Chapter 12 lecture and lab demo, complete the readings on wireless
          concepts, enterprise wireless design, wireless security, and
          troubleshooting, participate in the weekly discussion, complete the
          graded wireless security/troubleshooting labs, and finish the module
          quiz. Practice-only labs are available for extra repetition and do not
          count toward your grade.
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
          <li>Review “Lecture Ch. 12” and “Lab Demo Ch. 12”.</li>
          <li>
            Complete the Chapter 12 readings in CertMaster Learn and read
            Chapter 4 in the eTextbook.
          </li>
          <li>Post in “Discussion: Ethernet- Wired Connections”.</li>
          <li>
            Submit Labs 12.3.9 (Secure an Enterprise Wireless Network) and
            12.4.7 (Explore Wireless Network Problems).
          </li>
          <li>Finish the Week 12 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (wireless intrusion
            prevention, troubleshooting problems) for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
