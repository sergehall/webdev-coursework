import { ClipboardPenLine } from "lucide-react";

import type { CanvasItem } from "@/courses/CS85/assignments/shared/canvasItems";

export const assignment12AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 12 Assignment 12A: Integrating OpenAI",
  dueLabel: "Aug 2",
  pointsLabel: "100 pts",
};

export const assignmentPdfUrl =
  "/course-materials/CS85/mod-12/12a/Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf";

export const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf",
  },
];

export const rubricRows = [
  {
    criterion: "Form, route, and controller wired correctly",
    expectation:
      "The form POSTs to a named route. The controller validates the title, content type, and tone, and delegates to the service.",
    points: 15,
  },
  {
    criterion: "Service implemented from the spec",
    expectation:
      "You wrote generateDraft(): it sends the correct request, logs and throws on a failed response, and returns the content safely.",
    points: 25,
  },
  {
    criterion: "Prompt adapts to type and tone",
    expectation:
      "buildPrompt() asks for a different result for each content type and reflects the chosen tone.",
    points: 20,
  },
  {
    criterion: "Secure API key handling",
    expectation:
      "The key lives in .env and is read through config('services.openai.key'). Nothing sensitive is committed.",
    points: 12,
  },
  {
    criterion: "Error handling and logging",
    expectation:
      "Failures are caught, logged with Log::error, and shown to the user as a friendly message.",
    points: 8,
  },
  {
    criterion: "Editable draft output",
    expectation: "The generated draft is displayed in an editable textarea.",
    points: 5,
  },
  {
    criterion: "README quality",
    expectation:
      "Include Mac and Windows setup, how to obtain an API key, an app description, and a screenshot or screencast.",
    points: 10,
  },
  {
    criterion: "Git hygiene",
    expectation:
      "Use a public repository named cs85_module12 with clear, descriptive commits.",
    points: 5,
  },
] as const;
