// frontend/src/courses/CS70/CS70.tsx

import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import ModuleStatus from "@/components/ModuleStatus";
import FooterContent from "@/components/FooterContent";

function CS70() {
  return (
    <>
      <ModuleStatus />
      <AssignmentNav totalModules={16} />

      {/* Render modules like AutoAssignmentRouter or AllDonePage here */}
      <Outlet />
      <FooterContent
        course="CS 70 – Network Fundamentals and Architecture"
        instructor="Mehrak Amirfazlian"
        instructorEmail="amirfazlian_mehrak@smc.edu"
        institution="Santa Monica College • Fall 2025"
        student="Serge Hall"
      />
    </>
  );
}

export default CS70;
