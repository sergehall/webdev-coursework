// frontend/src/courses/CS79D/assignments/AssignmentPlaceholder.tsx

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 79D – Security in Amazon Web Services
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to <strong>CS 79D – Security in Amazon Web Services</strong>.
        This course covers the comprehensive set of tools, practices, and
        technologies that protect cloud-based infrastructure, data, and
        applications from threats and unauthorized access on{" "}
        <strong>Amazon Web Services (AWS)</strong>.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What you'll work on in this course:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Understanding the AWS Shared Responsibility Model</li>
          <li>Configuring Identity and Access Management (IAM)</li>
          <li>Securing AWS infrastructure with VPCs and security groups</li>
          <li>Implementing encryption and key management with AWS KMS</li>
          <li>Monitoring and auditing with AWS CloudTrail and CloudWatch</li>
          <li>
            Applying threat detection with Amazon GuardDuty and AWS Security Hub
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        🔐 Select a week or module from the navigation to begin exploring AWS
        security concepts, labs, and assignments for this course.
      </div>
    </section>
  );
}
