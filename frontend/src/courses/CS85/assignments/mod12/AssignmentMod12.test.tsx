import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod12 from "./AssignmentMod12";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod12 />", () => {
  it("renders the AI Integration and Career Tips ReadMe content", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod12 />);

    await user.click(
      screen.getByRole("button", {
        name: "ReadMe Module 12: AI Integration and Career Tips",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "AI Integration and Career Tips",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /transformed from a beginner into a developer who can build secure, database-driven web applications/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI-powered blog post generator/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /prompt engineering, service layer architecture, and external API integration/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/foundation for a successful development career/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "ReadMe Module 12: Career Tips and Sample Project content will be filled in later."
      )
    ).not.toBeInTheDocument();
  });

  it("renders the complete Assignment 12A instructions, rubric, and report", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod12 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 12 Assignment 12A: Integrating OpenAI",
      })
    );

    expect(screen.getByText("Aug 2")).toBeInTheDocument();
    expect(screen.getByText("100 pts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Assignment Overview" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Learning Objectives" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Step-by-Step Instructions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Prompt Engineering Requirements",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Evaluation Criteria — 100 Points" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Bonus: Automated Test (+8 Points)",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Reflection Questions" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("config('services.openai.key')", { exact: false })
    ).not.toHaveLength(0);
    expect(
      screen.getAllByText("AiContentService::class", { exact: false })
    ).not.toHaveLength(0);

    const repositoryLink = screen.getByRole("link", {
      name: "cs85-php-programming / assignments / module12a",
    });
    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://github.com/SergeHall/cs85-php-programming/tree/main/assignments/module12a"
    );

    const downloadLink = screen.getByRole("link", {
      name: "Download assignment PDF",
    });
    expect(downloadLink).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-12/12a/Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf"
    );

    await user.click(
      screen.getByRole("button", { name: "View assignment PDF" })
    );

    expect(
      screen.getByTitle(
        "Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf"
      )
    ).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-12/12a/Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf"
    );
    expect(
      screen.queryByText(
        "Assignment 12A - Aug 2 - 20 pts content will be filled in later."
      )
    ).not.toBeInTheDocument();
  });

  it("renders the complete Module 12 quiz instead of a placeholder", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod12 />);

    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 12 AI Integration" })
    );

    expect(
      screen.getByRole("heading", {
        name: "Quiz: Module 12 AI Integration",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Begin quiz" })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Quiz - Aug 2 - 20 pts content will be filled in later."
      )
    ).not.toBeInTheDocument();
  });

  it("renders the Module 12 reading and its PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod12 />);

    await user.click(screen.getByRole("button", { name: "Required Reading" }));

    expect(
      screen.getByRole("heading", {
        name: "AI Integration in PHP Applications",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Learning Objectives" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Test AI code by faking the HTTP layer/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Open original Canvas reading" })
    ).toHaveAttribute(
      "href",
      "https://online.smc.edu/courses/83209/files/22217317?wrap=1"
    );
    expect(
      screen.getByRole("link", { name: "Download reading PDF" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-12/reading/m12-AIintergration.pdf"
    );

    await user.click(screen.getByRole("button", { name: "View reading PDF" }));

    expect(screen.getByTitle("m12-AIintergration.pdf")).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-12/reading/m12-AIintergration.pdf"
    );
    expect(
      screen.queryByText("Required Reading content will be filled in later.")
    ).not.toBeInTheDocument();
  });

  it("renders the complete final project brief, links, and report", async () => {
    const user = userEvent.setup();

    const { container } = render(<AssignmentMod12 />);

    await user.click(
      screen.getByRole("button", {
        name: "Final Project",
      })
    );

    expect(screen.getByText("Aug 2")).toBeInTheDocument();
    expect(screen.getByText("100 pts")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AI Powered Web Application",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Project Requirements" })
    ).toBeInTheDocument();
    expect(screen.getByText("Use Laravel.")).toBeInTheDocument();
    expect(screen.getByText(/Use MySQL/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AI Ideas — Choose One or Invent Your Own",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Blog Assistant" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Study Guide" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Career Coach" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Chat Companion" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Content Classifier" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "AI Coding Assistant" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Submission Requirements" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Hybrid AI Study Studio" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "sergehall/cs85-php-programming",
      })
    ).toHaveAttribute(
      "href",
      "https://github.com/sergehall/cs85-php-programming"
    );
    expect(
      screen.getByRole("link", {
        name: /Watch the CS85 AI-powered Laravel application demo/,
      })
    ).toHaveAttribute(
      "href",
      "https://sergehall.github.io/cs85-php-programming/"
    );
    expect(
      screen.getByRole("heading", {
        name: "See the complete application in action",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Demo chapters")).toBeInTheDocument();
    expect(screen.getByText("Administration")).toBeInTheDocument();

    const video = container.querySelector("video");
    const videoSource = container.querySelector("video source");
    expect(video).toHaveAttribute(
      "poster",
      "https://sergehall.github.io/cs85-php-programming/assets/cs85-ai-powered-application-demo-poster.jpg"
    );
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(videoSource).toHaveAttribute(
      "src",
      "https://sergehall.github.io/cs85-php-programming/assets/cs85-ai-powered-application-demo.mp4"
    );
    expect(
      screen.getByRole("link", { name: "Download final report" })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-12/final-project/CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf"
    );

    await user.click(screen.getByRole("button", { name: "View final report" }));

    expect(
      screen.getByTitle(
        "CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf"
      )
    ).toHaveAttribute(
      "src",
      "/code-playground/CS85/mod-12/final-project/CS85_Siarhei_Hancharo_Final_Project_AI_Powered_Web_Application.pdf"
    );
  });
});
