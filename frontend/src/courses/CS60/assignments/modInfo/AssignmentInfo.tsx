// frontend/src/courses/CS70/assignments/AssignmentInfo.tsx

import { DownloadAssignmentBundleButton } from "@/components/buttons";

type StartHereItem = {
  title: string;
  downloadable?: boolean;
};

export default function AssignmentInfo() {
  const files = [
    {
      fileUrl: "/code-playground/CS70/Syllabus-CS70-1750.pdf",
      filename: "Syllabus-CS70-1750.pdf",
    },
    {
      fileUrl: "/code-playground/CS70/Network_Rack_Facts.pdf",
      filename: "Network_Rack_Facts.pdf",
    },
    {
      fileUrl: "/code-playground/CS70/Commands-Cisco-Switch.pdf",
      filename: "Commands-Cisco-Switch.pdf",
    },
  ];

  const items: StartHereItem[] = [
    { title: "ORIENTATION - Please watch" },
    {
      title:
        "Click here for instructions on accessing the textbook(s): e-book through the library",
    },
    { title: "Instruction on Network Rack Facts", downloadable: true },
    { title: "How to Use TestOut/CompTIA Simulator" },
    { title: "Use of MLA formatting to upload assignments" },
    { title: "Instruction on how to use Virtual Cloud Lab (VCL)" },
    { title: "Most Common Professional Organizations" },
    { title: "Commands - Cisco Switch", downloadable: true },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">CS 70 – Start Here</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Use this section to get set up for CS 70. Review the orientation
        resources, textbook access instructions, lab/simulator guidance, and
        course conventions before starting weekly modules.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Start Here Resources
        </h3>

        {/* ✅ Dedicated syllabus block (required document) */}
        <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/30 p-4">
          <p className="text-lg font-semibold text-blue-100">
            📘 Course Syllabus — CS 70
          </p>
          <p className="mt-1 text-sm text-blue-200">
            Review the syllabus carefully for course policies, grading, and
            weekly expectations. Available for download below.
          </p>
        </div>

        {/* 📄 Main resource list (documents marked with an icon) */}
        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                {item.downloadable ? "📘" : "•"}
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Downloadable Files
          </p>
          <div className="mt-2">
            <DownloadAssignmentBundleButton files={files} />
          </div>
        </div>
      </div>
    </div>
  );
}
