// frontend/src/courses/CS60/CS60.tsx
import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS60() {
  return (
    <>
      <ModuleStatus />
      <AssignmentNav totalModules={10} />

      {/* Render modules like AutoAssignmentRouter or AllDonePage here */}
      <Outlet />

      <FooterContent
        course="CS 60 – Database Concepts & Applications"
        instructor="Viren Sharma"
        instructorEmail="sharma_viren_d@smc.edu"
        institution="Santa Monica College • Fall 2025"
        student="Serge Hall"
      />
    </>
  );
}

export default CS60;
