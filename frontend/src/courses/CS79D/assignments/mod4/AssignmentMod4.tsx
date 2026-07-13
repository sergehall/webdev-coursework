import CloudPractitionerMidterm from "./CloudPractitionerMidterm";

import CS79DModuleScaffold from "@/courses/CS79D/components/CS79DModuleScaffold";
import { cs79dModule04Blueprint } from "@/courses/CS79D/data/modules/module04";

export default function AssignmentMod4() {
  return (
    <CS79DModuleScaffold
      module={cs79dModule04Blueprint}
      assessment={<CloudPractitionerMidterm />}
    />
  );
}
