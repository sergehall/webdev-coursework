import React from "react";
import { BookOpen, Sparkles, Info, School } from "lucide-react";

import { TagBadge, tagIconMap } from "@/components/tags";
import type { TagIconLabel } from "@/components/tags";
import type { Course, BaseCourse } from "@/data/webDeveloperCourses";

interface Props {
  course: Course;
  selected?: BaseCourse;
  selectedCode?: string;
  onSelectChange?: (value: string) => void;
  readOnly?: boolean;
  compact?: boolean;
}

const ExpandedCourseCard: React.FC<Props> = ({
  course,
  selected,
  selectedCode,
  onSelectChange,
  readOnly = false,
  compact = false,
}) => {
  const display: BaseCourse = selected ?? (course as BaseCourse);

  const combinedTags = Array.from(
    new Set([
      ...("tags" in course ? course.tags : []),
      ...(selected?.tags ?? []),
    ])
  );

  const padding = compact ? "p-3" : "p-6";
  const textSize = compact ? "text-sm" : "text-base";
  const titleSize = compact ? "text-lg" : "text-2xl";

  return (
    <section
      className={`space-y-6 rounded-xl bg-white ${padding} shadow-md dark:bg-gray-800 dark:text-white`}
    >
      {/* Course title */}
      <div className="flex items-center gap-3">
        <BookOpen
          className={`${compact ? "h-5 w-5" : "h-6 w-6"} text-indigo-500 dark:text-indigo-400`}
        />
        <h1 className={`font-bold ${titleSize}`}>
          {display.title} ({display.code})
        </h1>
      </div>

      {/* Description */}
      {(display.description || display.descriptionSummary) && (
        <p className="text-gray-700 dark:text-gray-300">
          {display.description ?? display.descriptionSummary}
        </p>
      )}

      {/* Course option selector */}
      {!readOnly && "options" in course && (
        <div>
          <label className="mb-1 block font-semibold">Choose one option:</label>
          <select
            value={selectedCode || ""}
            onChange={(e) => onSelectChange?.(e.target.value)}
            className="w-full rounded-md border-2 border-blue-500 bg-white p-2 text-gray-900 focus:border-blue-700 focus:outline-none dark:border-blue-400 dark:bg-gray-900 dark:text-white"
          >
            <option value="" disabled hidden>
              — Select a course —
            </option>
            {course.options.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.code} – {opt.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Course attributes */}
      <ul className={`flex flex-col flex-wrap gap-4 ${textSize} sm:flex-row`}>
        <li className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <strong>Units:</strong> {display.units}
        </li>
        {display.skillsAdvisory && (
          <li className="flex items-center gap-2">
            <Info className="h-4 w-4 text-yellow-500" />
            <strong>Skills Advisory:</strong> {display.skillsAdvisory}
          </li>
        )}
        {display.transfersTo && (
          <li className="flex items-center gap-2">
            <School className="h-4 w-4 text-blue-500" />
            <strong>Transfers To:</strong> {display.transfersTo}
          </li>
        )}
      </ul>

      {/* Tags */}
      {combinedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {combinedTags.map((tag, index) =>
            tag in tagIconMap ? (
              <TagBadge key={index} label={tag as TagIconLabel} />
            ) : (
              <span
                key={index}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs text-gray-800"
                title={tag}
              >
                {tag[0]}
              </span>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default ExpandedCourseCard;
