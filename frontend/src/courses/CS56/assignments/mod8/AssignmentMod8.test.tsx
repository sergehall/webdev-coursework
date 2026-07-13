import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AssignmentMod8 from "./AssignmentMod8";

const markAsCompleted = vi.fn();

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted,
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod8 />", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("allows module completion independently of the midterm attempt", async () => {
    render(<AssignmentMod8 />);

    const completionButton = screen.getByRole("button", {
      name: "Complete module 8",
    });
    expect(completionButton).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/enter the access code/i), {
      target: { value: "START" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Begin quiz" }));

    expect(completionButton).toBeInTheDocument();

    fireEvent.click(completionButton);

    expect(markAsCompleted).toHaveBeenCalledWith(8);
  });
});
