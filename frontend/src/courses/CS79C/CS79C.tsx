import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS79C() {
  return (
    <>
      <ModuleStatus />
      <AssignmentNav totalModules={10} />

      <Outlet />

      <FooterContent
        course="CS 79C – Compute Engines in Amazon Web Services"
        instructor="Vicky Tanya Seno"
        instructorEmail="seno_vicky@smc.edu"
        institution="Santa Monica College • Spring 2026"
        student="Serge Hall"
      />
    </>
  );
}

export default CS79C;
