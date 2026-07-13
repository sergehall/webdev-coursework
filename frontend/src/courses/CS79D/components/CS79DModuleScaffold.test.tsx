import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import CS79DModuleScaffold from "./CS79DModuleScaffold";

import { cs79dModule04Blueprint } from "@/courses/CS79D/data/modules/module04";

vi.mock("@/hooks/useFinalModuleRedirect", () => ({
  useFinalModuleRedirect: vi.fn(),
}));

vi.mock("@/components/buttons", () => ({
  ModuleCompletionButton: () => null,
}));

describe("CS79DModuleScaffold", () => {
  test("keeps an assessment collapsed until its heading is activated", () => {
    render(
      <CS79DModuleScaffold
        module={cs79dModule04Blueprint}
        assessment={<div>Cloud Practitioner assessment content</div>}
        assessmentTitle="Midterm: Cloud Practitioner Practice Exam"
      />
    );

    const toggle = screen.getByRole("button", {
      name: "Midterm: Cloud Practitioner Practice Exam",
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("Cloud Practitioner assessment content")
    ).not.toBeInTheDocument();

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Cloud Practitioner assessment content")
    ).toBeInTheDocument();
  });
});
