import { useParams } from "react-router-dom";

import CompletionCelebration from "../components/CompletionCelebration";

import ResetButton from "@/components/buttons/ResetButton";
import { useClientId } from "@/hooks/useClientId";
import { resetAllModules } from "@/api/quiz-progress";
import { COURSE_PROGRESS_CONFIG } from "@/api/config/course-progress";
import type { CourseId } from "@/api/config/course-progress";

export default function AllDonePage() {
  const clientId = useClientId();
  const { courseId } = useParams<{ courseId: CourseId }>();

  const currentConfig = courseId ? COURSE_PROGRESS_CONFIG[courseId] : undefined;

  const handleReset = async () => {
    if (!clientId || !courseId || !currentConfig) return;

    const confirmReset = window.confirm(
      "Are you sure you want to reset your progress? This action cannot be undone."
    );

    if (!confirmReset) return;

    try {
      await resetAllModules({ clientId, appId: currentConfig.appId, courseId });
      window.location.href = `/coursework/${courseId}/assignment/1`;
    } catch (err) {
      console.error("Failed to reset progress:", err);
      alert("Unable to reset progress. Please try again later.");
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 p-6 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800">
      <CompletionCelebration />

      <div className="mt-10 flex justify-center">
        <ResetButton
          onClick={handleReset}
          label="Reset Progress"
          variant="red"
          size="md"
          className="font-semibold text-white"
        />
      </div>
    </main>
  );
}
