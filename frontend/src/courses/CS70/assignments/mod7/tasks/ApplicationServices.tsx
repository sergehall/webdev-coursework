// frontend/src/courses/CS70/assignments/mod7/tasks/ApplicationServices.tsx

export default function ApplicationServices() {
  const dueDate = "Oct 19, 2025";

  const ungradedItems = [
    // Practice-only lab (0 pts)
    { title: "7.3.6 - Lab: Connect VoIP 1 (Practice Only)", due: dueDate },

    // Recorded lecture
    { title: "Recorded Lectures: Lecture Ch. 7", due: dueDate },

    // Readings
    { title: "Read Ch 7 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "7.1 - Application Security and Time Synchronization: Read subsections from 7.1.1 to 7.1.3",
      due: dueDate,
    },
    {
      title:
        "7.2 - Web, File, Print, and Database Services: Read subsections from 7.2.1 to 7.2.7",
      due: dueDate,
    },
    {
      title:
        "7.3 - Email and Voice Services: Read subsections from 7.3.1 to 7.3.5",
      due: dueDate,
    },
    {
      title:
        "7.4 - Disaster Recovery and High Availability: Read subsections from 7.4.1 to 7.4.7",
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
      title: "Discussion: Neuralink and Secure Wireless Communication",
      due: dueDate,
      points: 20,
    },
    { title: "7.4.8 - Lab: Configure NIC Teaming", due: dueDate, points: 10 },
    { title: "7.5 - Module Quiz", due: dueDate, points: 20 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 7 work focused on application services. You’ll review
          the Chapter 7 lecture and readings, participate in the discussion on
          secure wireless communication, complete the NIC teaming lab, and
          finish the module quiz. A practice-only VoIP lab is also available for
          extra hands-on learning and does not count toward your grade.
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
          <li>Watch/Review “Lecture Ch. 7”.</li>
          <li>
            Complete the Chapter 7 readings in CertMaster Learn and read Chapter
            10 in the eTextbook.
          </li>
          <li>
            Post in “Discussion: Neuralink and Secure Wireless Communication”.
          </li>
          <li>Submit Lab 7.4.8 (Configure NIC Teaming).</li>
          <li>Finish the Week 7 Module Quiz.</li>
          <li>
            (Optional) Complete the practice-only VoIP lab for extra experience.
          </li>
        </ul>
      </div>
    </div>
  );
}
