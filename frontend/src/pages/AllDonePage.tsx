import CompletionCelebration from "../components/CompletionCelebration";

import ResetButton from "@/components/buttons/ResetButton";
import { useClientId } from "@/hooks/useClientId";
import { resetAllModules } from "@/api/quiz-progress";
import { QUIZ_APP_CONFIG } from "@/api/config/quiz-app";

export default function AllDonePage() {
  // Get unique client ID (e.g. from localStorage or server-generated value)
  const clientId = useClientId();

  /**
   * Handles resetting user progress by calling backend API
   * and then redirecting to the first module.
   */
  const handleReset = async () => {
    if (!clientId) return;

    // Confirm action with the user
    const confirm = window.confirm(
      "Are you sure you want to reset your progress? This action cannot be undone."
    );

    if (!confirm) return;

    try {
      // Call backend to delete all completed modules for this user
      await resetAllModules({ clientId, appId: QUIZ_APP_CONFIG.appId });

      // Force redirect to first module to reinitialize routing and context
      window.location.href = "/assignments/1";
    } catch (err) {
      console.error("Failed to reset progress:", err);
      alert("Unable to reset progress. Please try again later.");
    }
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 p-6 transition-colors duration-300 dark:from-gray-900 dark:to-gray-800">
      {/* Celebration animation shown after completing all modules */}
      <CompletionCelebration />

      {/* Reset progress button with custom styling */}
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
