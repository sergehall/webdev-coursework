// frontend/src/courses/CS70/components/AssignmentPlaceholder.tsx
export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 70 – Network Fundamentals and Architecture
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to{" "}
        <strong>CS 70 – Network Fundamentals and Architecture</strong>. This
        course introduces the core concepts of computer networking, network
        design, protocols, services, and security, with alignment to
        <strong> CompTIA Network+</strong>.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What you’ll work on in this course:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Understanding network components, models, and topologies</li>
          <li>Working with cabling, physical media, and network interfaces</li>
          <li>Learning IP addressing, subnetting, and routing fundamentals</li>
          <li>
            Exploring core network services such as DNS, DHCP, and web servers
          </li>
          <li>
            Applying network security concepts, controls, and best practices
          </li>
          <li>
            Analyzing wireless, remote access, and cloud networking solutions
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        🌐 Select a week or topic from the navigation to begin exploring network
        concepts, labs, and assignments for this course.
      </div>
    </section>
  );
}
