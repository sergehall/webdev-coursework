// src/components/CS81.tsx

import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS80() {
  return (
    <div className="p-3">
      <ModuleStatus />
      <AssignmentNav totalModules={6} />
      <Outlet />
      <FooterContent
        course="CS 80 – Internet Programming"
        instructor="Anthony Wang"
        instructorEmail="wang_anthony@smc.edu"
        institution="Santa Monica College • Summer 2025"
        student="Serge Hall"
      />
    </div>
  );
}
export default CS80;
