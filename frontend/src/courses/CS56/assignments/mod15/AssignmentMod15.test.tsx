import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AssignmentMod15View } from "./AssignmentMod15";
import { assignment15Links, rubricEvidence } from "./assignment15Data";

const markAsCompleted = vi.fn();

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted,
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod15View />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows both Java repositories and the hosted project demo", () => {
    const { container } = render(<AssignmentMod15View />);

    expect(
      screen.getByRole("heading", {
        name: /javafx event handling group project/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Java Start" })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", {
        name: /sergehall\/javafx-event-handling-group-project/i,
      })[0]
    ).toHaveAttribute("href", assignment15Links.javafxRepository);
    expect(
      screen.getByRole("link", { name: /sergehall\/java-start/i })
    ).toHaveAttribute("href", assignment15Links.javaStartRepository);

    const video = container.querySelector("video");
    const source = container.querySelector("video source");
    expect(video).toHaveAttribute("poster", assignment15Links.demoPoster);
    expect(source).toHaveAttribute("src", assignment15Links.demoVideo);
  });

  it("places the Final Exam in a collapsed section above the completed work", () => {
    render(<AssignmentMod15View />);

    const finalExamToggle = screen.getByRole("button", { name: "Final Exam" });
    const completedWorkHeading = screen.getByRole("heading", {
      name: "Two Java projects, shown with clear roles.",
    });

    expect(finalExamToggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByLabelText(/enter the access code/i)
    ).not.toBeInTheDocument();
    expect(
      finalExamToggle.compareDocumentPosition(completedWorkHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    fireEvent.click(finalExamToggle);

    expect(finalExamToggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("heading", { name: "Final Exam" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/enter the access code/i)).toBeInTheDocument();
  });

  it("maps the complete 20-point rubric to implementation evidence", () => {
    render(<AssignmentMod15View />);

    for (const item of rubricEvidence) {
      expect(
        screen.getByRole("heading", { name: item.criterion })
      ).toBeInTheDocument();
      expect(screen.getByText(item.evidence)).toBeInTheDocument();
    }

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("total points")).toBeInTheDocument();
  });

  it("preserves the course module completion control", () => {
    render(<AssignmentMod15View />);

    expect(
      screen.getByRole("button", { name: "Complete module 15" })
    ).toBeInTheDocument();
  });
});
