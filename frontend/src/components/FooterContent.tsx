// src/components/FooterContent.tsx
import {
  BookOpenText,
  GraduationCap,
  School,
  UserRoundSearch,
} from "lucide-react";
import React from "react";

interface FooterContentProps {
  course: string;
  instructor: string;
  instructorEmail: string;
  institution: string;
  student: string;
}

const FooterContent: React.FC<FooterContentProps> = ({
  course,
  instructor,
  instructorEmail,
  institution,
  student,
}) => {
  return (
    <footer className="mt-10 space-y-2 border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <div className="mb-10 flex w-full justify-center">
        <div className="ml-8 w-full max-w-md space-y-3 pl-4 text-left text-sm text-gray-700 dark:text-white">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <p>
              <strong>Course:</strong> {course}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserRoundSearch className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <p>
              <strong>Instructor:</strong> {instructor} –{" "}
              <a
                className="underline hover:text-blue-600 dark:hover:text-blue-400"
                href={`mailto:${instructorEmail}`}
              >
                {instructorEmail}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <School className="h-5 w-5 text-pink-500 dark:text-pink-400" />
            <p>
              <strong>Institution:</strong> {institution}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            <p>
              <strong>Student:</strong> {student}
            </p>
          </div>
        </div>
      </div>
      <p>
        All assignments are built using valid HTML5. Use the{" "}
        <a
          href="https://validator.w3.org"
          className="underline hover:text-blue-500"
          target="_blank"
          rel="noreferrer"
        >
          W3C Validator
        </a>{" "}
        to confirm structure.
      </p>
    </footer>
  );
};

export default FooterContent;
