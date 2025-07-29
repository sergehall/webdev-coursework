// src/components/CS81.tsx

import { Outlet } from "react-router-dom";

import AssignmentNav from "@/components/AssignmentsNav";
import FooterContent from "@/components/FooterContent";
import ModuleStatus from "@/components/ModuleStatus";

function CS81() {
  return (
    <div className="p-3">
      <ModuleStatus />
      <AssignmentNav />
      <Outlet />
      <FooterContent />
    </div>
  );
}
export default CS81;
