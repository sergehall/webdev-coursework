// frontend/src/courses/CS70/assignments/mod13/tasks/RemoteAccessMethods.tsx

export default function RemoteAccessMethods() {
  const dueDate = "Nov 30, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts)
    {
      title: "13.3.8 - Lab: Allow Remote Desktop Connections (Practice Only)",
      due: dueDate,
    },
    {
      title: "13.3.9 - Lab: Use PowerShell Remote (Practice Only)",
      due: dueDate,
    },

    // Lecture
    { title: "Lectures: Lecture Ch. 13", due: dueDate },

    // Readings
    { title: "Read Ch13 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "13.1 - WAN and Internet Connectivity: Read subsections from 13.1.1 to 13.1.3",
      due: dueDate,
    },
    {
      title:
        "13.2 - Virtual Private Networks: Read subsections from 13.2.1 to 13.2.7",
      due: dueDate,
    },
    {
      title: "13.3 - Remote Management: Read subsections from 13.3.1 to 13.3.7",
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
      title: "13.2.8 - Lab: Configure a Remote Access VPN",
      due: dueDate,
      points: 10,
    },
    {
      title: "13.2.10 - Lab: Configure a RADIUS Solution",
      due: dueDate,
      points: 10,
    },
    { title: "13.4 - Module Quiz", due: dueDate, points: 15 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 13 work focused on remote access methods. You’ll review
          the Chapter 13 lecture and readings (WAN connectivity, VPNs, and
          remote management), complete the graded labs to configure a remote
          access VPN and a RADIUS solution, and finish the module quiz.
          Practice-only labs (Remote Desktop and PowerShell Remoting) are
          available for extra repetition and do not count toward your grade.
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
          <li>Review “Lecture Ch. 13”.</li>
          <li>
            Complete the Chapter 13 readings in CertMaster Learn and read
            Chapter 4 in the eTextbook.
          </li>
          <li>
            Submit Labs 13.2.8 (Remote Access VPN) and 13.2.10 (RADIUS
            Solution).
          </li>
          <li>Finish the Week 13 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (Remote Desktop, PowerShell
            Remoting) for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
