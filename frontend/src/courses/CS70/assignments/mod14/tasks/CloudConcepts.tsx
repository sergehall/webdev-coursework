// frontend/src/courses/CS70/assignments/mod14/tasks/CloudConcepts.tsx

export default function CloudConcepts() {
  const dueDate = "Dec 7, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts)
    {
      title: "14.1.5 - Lab: Configure an iSCSI Target (Practice Only)",
      due: dueDate,
    },
    {
      title: "14.1.6 - Lab: Configure an iSCSI Initiator (Practice Only)",
      due: dueDate,
    },

    // Recorded lecture
    { title: "Recorded Lectures: Lecture Ch. 14", due: dueDate },

    // Readings
    { title: "Read Ch14 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "14.1 - Datacenter and Storage Networks: Read subsections from 14.1.1 to 14.1.4",
      due: dueDate,
    },
    {
      title: "14.2 - Cloud Concepts: Read subsections from 14.2.1 to 14.2.4",
      due: dueDate,
    },
    {
      title: "14.3 - Cloud Networking: Read subsections from 14.3.1 to 14.3.6",
      due: dueDate,
    },
    {
      title:
        "14.4 - Modern Network Environments: Read subsections from 14.4.1 to 14.4.8",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 12 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    { title: "Lab: Calculating Cloud Costs -AWS", due: dueDate, points: 15 },
    { title: "14.5 - Module Quiz", due: dueDate, points: 20 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 14 work focused on cloud concepts and modern network
          environments. You’ll review the Chapter 14 recorded lecture, complete
          the readings on datacenter/storage networks, cloud concepts, cloud
          networking, and modern environments, complete the graded lab on AWS
          cloud cost calculation, and finish the module quiz. Practice-only
          iSCSI labs are available for extra hands-on repetition and do not
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
          <li>Review “Lecture Ch. 14” (Recorded Lectures).</li>
          <li>
            Complete the Chapter 14 readings in CertMaster Learn and read
            Chapter 12 in the eTextbook.
          </li>
          <li>Submit “Lab: Calculating Cloud Costs -AWS”.</li>
          <li>Finish the Week 14 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only iSCSI labs (Target + Initiator)
            for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
