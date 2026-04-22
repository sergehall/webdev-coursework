// frontend/src/courses/CS79D/CS79D.tsx

import { Outlet } from "react-router-dom";

import ProgressProvider from "@/context/ProgressProvider";
import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS79D() {
  return (
    <div className="p-3">
      <ProgressProvider>
        <ModuleStatus />
        <AssignmentNav totalModules={8} />

        <Outlet />

        <FooterContent
          course="CS 79D – Security in Amazon Web Services"
          instructor="Koda Kol"
          instructorEmail="kol_koda@smc.edu"
          institution="Santa Monica College • Spring 2026"
          student="Serge Hall"
        />
      </ProgressProvider>
    </div>
  );
}

export default CS79D;
