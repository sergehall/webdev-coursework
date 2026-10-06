import type { DemoScenario } from "./mentor-demo";

const failures: Record<Exclude<DemoScenario, "normal">, string> = {
  unavailable: "Example response unavailable. Your question was saved.",
  quota: "Example limit reached. Your question was saved.",
  timeout: "Example response timed out. Your question was saved.",
  "invalid-plan": "The example draft was invalid. Your question was saved.",
  conflict: "The plan changed in another tab. Reload to review it.",
};

export function previewFailure(scenario: Exclude<DemoScenario, "normal">) {
  return failures[scenario];
}
