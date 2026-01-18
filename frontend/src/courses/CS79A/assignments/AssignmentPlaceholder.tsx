// frontend/src/courses/CS79A/assignments/AssignmentPlaceholder.tsx

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 79A – Cloud Computing with AWS
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to <strong>CS 79A – Cloud Computing with AWS</strong>. This
        course introduces the fundamentals of cloud computing with a strong
        hands-on focus using <strong>Amazon Web Services (AWS)</strong>. You
        will explore how modern cloud infrastructure is designed, deployed, and
        managed in real-world environments.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What you’ll work on in this course:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Understanding core cloud computing concepts and service models
          </li>
          <li>Working with the AWS Management Console and core AWS services</li>
          <li>Completing hands-on AWS Academy and Learner Lab exercises</li>
          <li>Deploying and managing basic cloud-based resources</li>
          <li>
            Exploring cloud security fundamentals, identity, and access
            management
          </li>
          <li>
            Applying troubleshooting, research, and problem-solving techniques
            in cloud environments
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        ☁️ Select a week or module from the navigation to begin exploring cloud
        concepts, labs, and assignments for this course.
      </div>
    </section>
  );
}
