import CS85ModuleScaffold from "@/courses/CS85/components/CS85ModuleScaffold";
import { cs85ModuleBlueprints } from "@/courses/CS85/data/moduleBlueprints";

export default function AssignmentMod2() {
  return <CS85ModuleScaffold module={cs85ModuleBlueprints[1]} />;
}
