// frontend/src/courses/CS70/assignments/mod8/tasks/NetworkManagement.tsx

export default function NetworkManagement() {
  const dueDate = "Oct 26, 2025";

  const ungradedItems = [
    { title: "Survey #3", due: dueDate },

    // Practice-only labs (0 pts)
    { title: "8.1.11 - Lab: Update Firmware (Practice Only)", due: dueDate },
    {
      title:
        "8.4.8 - Lab: Auditing Device Logs on a Cisco Switch (Practice Only)",
      due: dueDate,
    },
    { title: "8.6.7 - Lab: Configure QoS (Practice Only)", due: dueDate },

    // Lab demos + lecture
    { title: "Lab Demos: Lab-Demo-Ch.8", due: dueDate },
    { title: "Lectures: Lecture Ch. 8", due: dueDate },

    // Readings
    { title: "Read Ch8 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "8.1 - Organizational Policies and Documentation: Read subsections from 8.1.1 to 8.1.10",
      due: dueDate,
    },
    {
      title:
        "8.2 - Host Discovery and Monitoring: Read subsections from 8.2.1 to 8.2.7",
      due: dueDate,
    },
    {
      title:
        "8.3 - Simple Network Management Protocol: Read subsections from 8.3.1 to 8.3.2",
      due: dueDate,
    },
    {
      title: "8.4 - Event Management: Read subsections from 8.4.1 to 8.4.5",
      due: dueDate,
    },
    {
      title:
        "8.5 - Packet Capture and Analysis: Read subsections from 8.5.1 to 8.5.3",
      due: dueDate,
    },
    {
      title: "8.6 - Traffic Monitoring: Read subsections from 8.6.1 to 8.6.6",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 10 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title:
        "Discussion: Fourier Analysis - Decomposition and Composite Wave Applications",
      due: dueDate,
      points: 20,
    },
    {
      title: "8.4.6 - Lab: Configure Logging in pfSense",
      due: dueDate,
      points: 5,
    },
    {
      title: "8.5.5 - Lab: Troubleshoot with Wireshark",
      due: dueDate,
      points: 20,
    },
    { title: "8.7 - Module Quiz", due: dueDate, points: 30 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 8 work focused on network management. You’ll review the
          Chapter 8 lab demo and lecture, complete the readings (policies,
          discovery/monitoring, SNMP, event management, packet capture/analysis,
          and traffic monitoring), participate in the weekly discussion,
          configure logging in pfSense, troubleshoot using Wireshark, and finish
          the module quiz. Practice-only labs are available for extra hands-on
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
          <li>Complete Survey #3 by the due date.</li>
          <li>Review Lab-Demo-Ch.8 and “Lecture Ch. 8”.</li>
          <li>
            Complete the Chapter 8 readings in CertMaster Learn and read Chapter
            10 in the eTextbook.
          </li>
          <li>Post in the Week 8 discussion (Fourier Analysis topic).</li>
          <li>Submit Lab 8.4.6 (Configure Logging in pfSense).</li>
          <li>Submit Lab 8.5.5 (Troubleshoot with Wireshark).</li>
          <li>Finish the Week 8 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (firmware, log auditing, QoS)
            for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
