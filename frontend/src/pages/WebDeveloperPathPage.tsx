import WebDevMajorRequirements from "@/components/WebDevMajorRequirements";
import PathwaySections from "@/components/PathwaySections";
import { TagLegend } from "@/components/tags";

const WebDeveloperPathPage = () => {
  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Web Developer AS Degree & Certificate Pathway
      </h2>

      {/* Add vertical spacing between components */}
      <div className="flex flex-col gap-1">
        <PathwaySections />
        <TagLegend />
        <WebDevMajorRequirements />
      </div>
    </div>
  );
};

export default WebDeveloperPathPage;
