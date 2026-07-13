import MidtermQuiz from "./MidtermQuiz";

import { ModuleCompletionButton } from "@/components/buttons";

export default function AssignmentMod8() {
  return (
    <section className="space-y-6 rounded-xl bg-white p-4 shadow-md sm:p-6 dark:bg-gray-900">
      <MidtermQuiz />
      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
