// frontend/src/courses/CS70/assignments/mod10/tasks/ApplyingNetworkSecurity.tsx

export default function ApplyingNetworkSecurity() {
  const dueDate = "Nov 9, 2025";

  const ungradedItems = [
    // Lecture
    { title: "Lectures: Lecture Ch. 10", due: dueDate },

    // Readings
    { title: "Read Ch10 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title: "10.1 - Authentication: Read subsections from 10.1.1 to 10.1.8",
      due: dueDate,
    },
    {
      title:
        "10.2 - Authorization and Account Management: Read subsections from 10.2.1 to 10.2.4",
      due: dueDate,
    },
    {
      title: "10.3 - Network Hardening: Read subsections from 10.3.1 to 10.3.2",
      due: dueDate,
    },
    {
      title:
        "10.4 - Switch Security: Read subsections 10.4.1, 10.4.5, 10.4.6, 10.4.8",
      due: dueDate,
    },
    {
      title:
        "10.5 - Network Security Rules: Read subsections from 10.5.1 to 10.5.4",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 11 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },

    // Practice-only labs (0 pts)
    {
      title: "10.3.5 - Lab: Scan for Unsecure Protocols (Practice Only)",
      due: dueDate,
    },
    {
      title: "10.4.2 - Lab: Secure Access to a Switch (Practice Only)",
      due: dueDate,
    },
    {
      title: "10.4.4 - Lab: Disable Switch Ports - GUI (Practice Only)",
      due: dueDate,
    },
    {
      title: "10.5.8 - Lab: Configure a Perimeter Firewall (Practice Only)",
      due: dueDate,
    },

    // Lab demos
    { title: "Lab Demos: Ch. 10", due: dueDate },
  ];

  const gradedAssignments = [
    {
      title:
        "Discussion: Web of Words - Echoes of Jon in Today's Internet Dynamics-",
      due: dueDate,
      points: 25,
    },
    { title: "10.3.7 - Lab: Disable Network Service", due: dueDate, points: 5 },
    {
      title: "10.5.9 - Lab: Restrict Telnet and SSH Access",
      due: dueDate,
      points: 10,
    },
    { title: "10.5.11 - Lab: Block Source Hosts", due: dueDate, points: 10 },
    { title: "10.6 - Module Quiz", due: dueDate, points: 25 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 10 work focused on applying network security controls.
          You’ll review the Chapter 10 lecture, lab demos, and readings
          (authentication, authorization/account management, hardening, switch
          security, and security rules), participate in the weekly discussion,
          complete graded labs (disable a network service, restrict Telnet/SSH,
          and block source hosts), and finish the module quiz. Practice-only
          labs are available for extra hands-on repetition and do not count
          toward your grade.
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
          <li>Review “Lecture Ch. 10” and “Lab Demos: Ch. 10”.</li>
          <li>
            Complete the Chapter 10 readings in CertMaster Learn and read
            Chapter 11 in the eTextbook.
          </li>
          <li>Post in the Week 10 discussion (Web of Words topic).</li>
          <li>Submit Labs 10.3.7, 10.5.9, and 10.5.11.</li>
          <li>Finish the Week 10 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (scan insecure protocols,
            secure switch access, disable ports, perimeter firewall).
          </li>
        </ul>
      </div>
    </div>
  );
}
