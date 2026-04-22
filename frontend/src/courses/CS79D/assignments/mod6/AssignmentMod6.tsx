import CS79DModuleScaffold from "@/courses/CS79D/components/CS79DModuleScaffold";
import { cs79dModuleBlueprints } from "@/courses/CS79D/data/moduleBlueprints";

export default function AssignmentMod6() {
  return <CS79DModuleScaffold module={cs79dModuleBlueprints[6 - 1]} />;
}
