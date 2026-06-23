import { Outlet, useLocation } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";
import ProgressProvider from "@/context/ProgressProvider";
import AssignmentPlaceholder from "@/courses/CS56/assignments/AssignmentPlaceholder";

function CS56() {
  const { pathname } = useLocation();
  const isCourseIndex = /\/coursework\/[^/]+\/assignment\/?$/.test(pathname);

  return (
    <div className="p-3">
      <ProgressProvider>
        <ModuleStatus />
        <AssignmentNav totalModules={15} />

        {isCourseIndex ? <AssignmentPlaceholder /> : null}
        <Outlet />

        <FooterContent
          course="CS 56 - Advanced Java Programming"
          instructor="Instructor from syllabus"
          instructorEmail="Email from syllabus"
          institution="Santa Monica College"
          student="Serge Hall"
        />
      </ProgressProvider>
    </div>
  );
}

export default CS56;
