// frontend/src/courses/CS70/assignments/mod9/tasks/NetworkSecurityConcepts.tsx

export default function NetworkSecurityConcepts() {
  const dueDate = "Nov 2, 2025";

  const ungradedItems = [
    // Lab demo + lecture
    { title: "Lab Demos: Lab Demo-Ch.9", due: dueDate },
    { title: "Lectures: Lecture Ch. 9", due: dueDate },

    // Practice-only labs (0 pts)
    {
      title: "9.2.5 - Lab: Analyze a DoS Attack (Practice Only)",
      due: dueDate,
    },
    {
      title:
        "9.3.9 - Lab: Perform a DHCP Spoofing On-Path Attack (Practice Only)",
      due: dueDate,
    },
    {
      title: "9.4.7 - Lab: Configure DHCP Snooping (Practice Only)",
      due: dueDate,
    },
    {
      title:
        "9.5.4 - Lab: Crack a Password with John the Ripper (Practice Only)",
      due: dueDate,
    },

    // Readings
    { title: "Read Ch9 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title: "9.1 - Security Concepts: Read subsections from 9.1.1 to 9.1.6",
      due: dueDate,
    },
    {
      title:
        "9.2 - Network Threats and Attacks: Read subsections from 9.2.1 to 9.2.4",
      due: dueDate,
    },
    {
      title:
        "9.3 - Spoofing Attacks: Read subsections 9.3.1, 9.3.3, 9.3.4, 9.3.6",
      due: dueDate,
    },
    {
      title: "9.4 - Rogue System Attacks: Read subsections 9.4.1, 9.4.2, 9.4.4",
      due: dueDate,
    },
    {
      title: "9.5 - Social Engineering: Read subsections from 9.5.1 to 9.5.2",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 11 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title: "Takeaways from Week 9 youtube Interview on AI Collective Defense",
      due: dueDate,
      points: 10,
    },
    {
      title: "9.3.8 - Lab: Spoof MAC Addresses with SMAC",
      due: dueDate,
      points: 10,
    },
    { title: "9.4.9 - Lab: Analyze DNS Spoofing", due: dueDate, points: 5 },
    {
      title: "9.5.3 - Lab: Respond to Social Engineering Exploits",
      due: dueDate,
      points: 10,
    },
    { title: "9.6 - Module Quiz", due: dueDate, points: 25 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 9 work focused on core network security concepts. You’ll
          review the Chapter 9 demo and lecture, complete the Chapter 9 readings
          (security concepts, threats/attacks, spoofing, rogue systems, and
          social engineering), submit the “AI Collective Defense” takeaways,
          complete the graded security labs (MAC spoofing, DNS spoofing
          analysis, and responding to social engineering), and finish the module
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
          <li>Review Lab Demo-Ch.9 and “Lecture Ch. 9”.</li>
          <li>
            Complete the Chapter 9 readings in CertMaster Learn and read Chapter
            11 in the eTextbook.
          </li>
          <li>Submit the Week 9 “AI Collective Defense” takeaways.</li>
          <li>
            Submit Labs 9.3.8 (SMAC), 9.4.9 (Analyze DNS Spoofing), and 9.5.3
            (Social Engineering Exploits).
          </li>
          <li>Finish the Week 9 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (DoS, DHCP spoofing, DHCP
            snooping, password cracking) for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
