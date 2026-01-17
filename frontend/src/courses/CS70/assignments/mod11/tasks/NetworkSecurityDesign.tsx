// frontend/src/courses/CS70/assignments/mod11/tasks/NetworkSecurityDesign.tsx

export default function NetworkSecurityDesign() {
  const dueDate = "Nov 16, 2025";

  const ungradedItems = [
    // Practice-only labs (0 pts)
    {
      title: "11.1.5 - Lab: Configure a Screened Subnet (DMZ) (Practice Only)",
      due: dueDate,
    },
    {
      title: "11.2.5 - Lab: Scan for IoT Devices (Practice Only)",
      due: dueDate,
    },

    // Lab demos + lecture
    { title: "Lab Demos: Lab Demos- Ch. 11", due: dueDate },
    { title: "Lectures: Lecture Ch. 11", due: dueDate },

    // Readings
    { title: "Read Ch11 of CompTIA Network+ CertMaster Learn", due: dueDate },
    {
      title:
        "11.1 - Zone-based Security: Read subsections from 11.1.1, 11.1.3, 11.1.4, 11.1.7",
      due: dueDate,
    },
    {
      title:
        "11.2 - Internet of Things: Read subsections from 11.2.1 to 11.2.4",
      due: dueDate,
    },
    {
      title: "11.3 - Physical Security: Read subsections from 11.3.1 to 11.3.3",
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
      title:
        "Discussion: Technology In The News: AI Used to Reveal Details About Renaissance Paintings",
      due: dueDate,
      points: 20,
    },
    {
      title: "11.1.9 - Lab: Implement Intrusion Prevention",
      due: dueDate,
      points: 10,
    },
    {
      title: "11.3.4 - Lab: Implement Physical Security",
      due: dueDate,
      points: 10,
    },
    { title: "11.4 - Module Quiz", due: dueDate, points: 15 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete Week 11 work focused on network security design. You’ll
          review the Chapter 11 lecture and lab demos, complete the readings on
          zone-based security, IoT considerations, and physical security,
          participate in the weekly discussion, implement intrusion prevention
          and physical security controls in labs, and finish the module quiz.
          Practice-only labs (DMZ and IoT scanning) are available for extra
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
          <li>Review “Lecture Ch. 11” and “Lab Demos- Ch. 11”.</li>
          <li>
            Complete the Chapter 11 readings in CertMaster Learn and read
            Chapter 11 in the eTextbook.
          </li>
          <li>
            Post in the Week 11 discussion (AI + Renaissance Paintings topic).
          </li>
          <li>
            Submit Labs 11.1.9 (Implement Intrusion Prevention) and 11.3.4
            (Implement Physical Security).
          </li>
          <li>Finish the Week 11 Module Quiz.</li>
          <li>
            (Optional) Complete practice-only labs (DMZ setup and IoT scanning)
            for extra practice.
          </li>
        </ul>
      </div>
    </div>
  );
}
