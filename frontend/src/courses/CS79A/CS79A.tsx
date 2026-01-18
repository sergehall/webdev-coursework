// frontend/src/courses/CS79A/CS79A.tsx

import { Outlet } from "react-router-dom";

import ProgressProvider from "@/context/ProgressProvider";
import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS79A() {
  return (
    <div className="p-3">
      <ProgressProvider>
        <ModuleStatus />
        <AssignmentNav totalModules={8} />

        {/* Render modules like AutoAssignmentRouter or AllDonePage here */}
        <Outlet />

        <FooterContent
          course="CS 79A – Cloud Computing with AWS"
          instructor="Koda Kol"
          instructorEmail="kol_koda@smc.edu"
          institution="Santa Monica College • Fall 2025"
          student="Serge Hall"
        />
      </ProgressProvider>
    </div>
  );
}

export default CS79A;
