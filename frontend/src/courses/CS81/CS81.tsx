import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS81() {
  return (
    <>
      <ModuleStatus />
      <AssignmentNav totalModules={12} />

      {/* Render modules like AutoAssignmentRouter or AllDonePage here */}
      <Outlet />

      <FooterContent
        course="CS 81 – JavaScript Programming"
        instructor="Vicky Tanya Seno"
        instructorEmail="seno_vicky@smc.edu"
        institution="Santa Monica College • Summer 2025"
        student="Serge Hall"
      />
    </>
  );
}

export default CS81;
