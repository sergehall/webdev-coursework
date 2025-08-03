// src/components/CS81.tsx

import { Outlet } from "react-router-dom";

import ProgressProvider from "@/context/ProgressProvider";
import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS81() {
  return (
    <div className="p-3">
      <ProgressProvider>
        <ModuleStatus />
        <AssignmentNav totalModules={12} />
        <Outlet />
        <FooterContent
          course="CS 81 – JavaScript Programming"
          instructor="Vicky Tanya Seno"
          instructorEmail="seno_vicky@smc.edu"
          institution="Santa Monica College • Summer 2025"
          student="Serge Hall"
        />
      </ProgressProvider>
    </div>
  );
}

export default CS81;
