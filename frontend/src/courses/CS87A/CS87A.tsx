// frontend/src/courses/CS87A/CS87A.tsx
import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS87A() {
  return (
    <>
      <ModuleStatus />
      <AssignmentNav totalModules={6} />

      {/* Render modules like AutoAssignmentRouter or AllDonePage here */}
      <Outlet />

      <FooterContent
        course="CS 87A – Python Programming Sections 1832 & 1833"
        instructor="Scott Bishop"
        instructorEmail="bishop_scott@smc.edu"
        institution="Santa Monica College"
        student="Serge Hall"
      />
    </>
  );
}

export default CS87A;
