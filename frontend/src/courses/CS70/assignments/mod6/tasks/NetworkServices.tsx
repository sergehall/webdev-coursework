// frontend/src/courses/CS70/assignments/mod6/tasks/NetworkServices.tsx

export default function NetworkServices() {
  const dueDate = "Oct 12, 2025";

  const ungradedItems = [
    { title: "Labs Demos: Lab-Demos- Ch.6", due: dueDate },
    { title: "Recorded Lectures: Recorded Lectures- Ch.6", due: dueDate },

    // Readings (shown in screenshot)
    { title: "Read Ch 6 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "6.1 - Transport and Application Layer Protocols: Read subsections from 6.1.1 to 6.1.6",
      due: dueDate,
    },
    {
      title:
        "6.2 - Dynamic Host Configuration Protocol: Read subsections from 6.2.1 to 6.2.4",
      due: dueDate,
    },
    {
      title: "6.3 - APIPA and SLAAC: Read subsections from 6.3.1 to 6.3.3",
      due: dueDate,
    },
    {
      title:
        "6.4 - DHCP Relay and Troubleshooting: Read subsections from 6.4.1 to 6.4.2",
      due: dueDate,
    },
    {
      title: "6.5 - Domain Name System: Read subsections from 6.5.1 to 6.5.10",
      due: dueDate,
    },
    {
      title: "6.6 - DNS Troubleshooting: Read subsections from 6.6.1 to 6.6.4",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 10 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },

    // Practice-only labs (0 pts) — does not count toward grade
    {
      title: "6.4.7 - Lab: Explore DHCP Troubleshooting (Practice Only)",
      due: dueDate,
    },
    {
      title: "6.2.5 - Lab: Configure a DHCP Server (Practice Only)",
      due: dueDate,
    },
    {
      title: "6.3.4 - Lab: Explore APIPA Addressing (Practice Only)",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title: "Discussion: Dynamic vs. Static vs. Reserved IPs",
      due: dueDate,
      points: 20,
    },
    {
      title: "6.1.7 - Lab: Explore Three-Way Handshake in Wireshark",
      due: dueDate,
      points: 10,
    },
    {
      title: "6.4.8 - Lab: Troubleshoot IP Configuration 1",
      due: dueDate,
      points: 10,
    },
    { title: "6.7 - Module Quiz", due: dueDate, points: 30 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 6 work focused on core network services and IP
          configuration. You’ll review Chapter 6 materials (demos, recorded
          lecture, and readings), participate in the discussion on
          dynamic/static/reserved IPs, complete the Wireshark three-way
          handshake lab, troubleshoot IP configuration, and finish the module
          quiz. Practice-only DHCP/APIPA labs are available for extra repetition
          and do not count toward your grade.
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
          <li>Review the Lab Demos and Recorded Lecture for Chapter 6.</li>
          <li>
            Complete the Chapter 6 readings in CertMaster Learn and read Chapter
            10 in the eTextbook.
          </li>
          <li>Post in “Discussion: Dynamic vs. Static vs. Reserved IPs”.</li>
          <li>Submit Lab 6.1.7 (Three-Way Handshake in Wireshark).</li>
          <li>Submit Lab 6.4.8 (Troubleshoot IP Configuration 1).</li>
          <li>Finish the Week 6 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs for DHCP/APIPA
            troubleshooting practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
