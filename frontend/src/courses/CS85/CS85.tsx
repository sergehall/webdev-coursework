import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";
import ProgressProvider from "@/context/ProgressProvider";

function CS85() {
  return (
    <div className="p-3">
      <ProgressProvider>
        <ModuleStatus />
        <AssignmentNav totalModules={12} />

        <Outlet />

        <FooterContent
          course="CS 85 – PHP Programming"
          instructor="Vicky Seno"
          instructorEmail="seno_vicky@smc.edu"
          institution="Santa Monica College • Summer 2026"
          student="Serge Hall"
        />
      </ProgressProvider>
    </div>
  );
}

export default CS85;
