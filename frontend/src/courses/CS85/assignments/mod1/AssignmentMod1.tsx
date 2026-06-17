import CS85ModuleScaffold from "@/courses/CS85/components/CS85ModuleScaffold";
import { cs85ModuleBlueprints } from "@/courses/CS85/data/moduleBlueprints";

export default function AssignmentMod1() {
  return <CS85ModuleScaffold module={cs85ModuleBlueprints[0]} />;
}
