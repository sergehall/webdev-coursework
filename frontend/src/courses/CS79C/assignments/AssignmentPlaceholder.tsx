import { cs79cModuleBlueprints } from "@/courses/CS79C/data/moduleBlueprints";

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 79C – Compute Engines in Amazon Web Services
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to{" "}
        <strong>CS 79C – Compute Engines in Amazon Web Services</strong>. This
        course focuses on AWS compute architecture, distributed systems,
        scaling, and deployment workflows using services such as EC2, Elastic
        Load Balancing, ECS, EKS, Lambda, Elastic Beanstalk, and CloudFormation.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What this portal already includes:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>A live course portal for 9 syllabus-based modules</li>
          <li>A dedicated final project slot as module 10</li>
          <li>
            Starter scaffolding for notes, labs, screenshots, and deliverables
          </li>
          <li>
            Progress tracking so each module can be marked complete over time
          </li>
        </ul>
      </div>

      <div className="rounded border border-sky-200 bg-sky-50 p-4 dark:border-sky-800/50 dark:bg-sky-950/20">
        <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
          Current course map from the Spring 2026 syllabus:
        </p>

        <ul className="mt-3 space-y-2 text-sm text-sky-900/90 dark:text-sky-100/90">
          {cs79cModuleBlueprints.map((module) => (
            <li key={module.id}>
              <strong>
                {module.isFinalProject ? "Module 10" : `Module ${module.id}`}
              </strong>
              {": "}
              {module.title}
              {" — "}
              {module.dateLabel}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        Select a module from the navigation to unlock the next stage of the AWS
        compute course build-out.
      </div>
    </section>
  );
}
