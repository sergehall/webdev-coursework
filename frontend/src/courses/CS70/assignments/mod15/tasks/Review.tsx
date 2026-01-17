// frontend/src/courses/CS70/assignments/mod15/tasks/Review.tsx

export default function Review() {
  const dueDate = "Dec 14, 2025";

  const ungradedItems = [
    { title: "Survey #4", due: dueDate },

    // Recorded lecture + reading (no points shown)
    {
      title:
        "Recorded Lecture: Lecture- Networking systems-Apache, BIND,NFS,Samba,DHCP",
      due: dueDate,
    },
    {
      title:
        "Read Ch. 13 of eTextbook: Networking Essentials: Beasley and Nilkaew",
      due: dueDate,
    },
  ];

  const gradedAssignments = [
    {
      title:
        "Discussion: Current Cloud Security Developments, Concerns, and Solutions",
      due: dueDate,
      points: 20,
    },
    {
      title: "Skills Test: Competency in Networking",
      due: dueDate,
      points: 70,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 15 review work for CS 70. You’ll finish the weekly
          survey, participate in the cloud security discussion, complete the
          networking skills test, review the recorded lecture on networking
          systems (Apache, BIND, NFS, Samba, DHCP), and read Chapter 13 from the
          eTextbook.
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
          <li>Complete Survey #4 by the due date.</li>
          <li>Post in the cloud security discussion and follow netiquette.</li>
          <li>Complete the “Skills Test: Competency in Networking”.</li>
          <li>
            Watch the recorded lecture on networking systems (Apache, BIND, NFS,
            Samba, DHCP).
          </li>
          <li>Read Chapter 13 in the eTextbook.</li>
        </ul>
      </div>
    </div>
  );
}
