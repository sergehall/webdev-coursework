import CS79DModuleScaffold from "@/courses/CS79D/components/CS79DModuleScaffold";
import { cs79dModuleBlueprints } from "@/courses/CS79D/data/moduleBlueprints";

export default function AssignmentMod4() {
  return <CS79DModuleScaffold module={cs79dModuleBlueprints[4 - 1]} />;
}
