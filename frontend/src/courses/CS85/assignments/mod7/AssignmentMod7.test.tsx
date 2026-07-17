import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import AssignmentMod7 from "./AssignmentMod7";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: () => ({
    completedModules: [],
    markAsCompleted: vi.fn(),
    unmarkAsCompleted: vi.fn(),
  }),
}));

describe("<AssignmentMod7 />", () => {
  it("opens the Module 7 Assignment 7A PDF preview", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod7 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 7 Assignment 7A: Hello Route",
      })
    );

    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(
      screen.getByText("Part 1: Laravel Installation & Project Setup")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Part 4: Required Knowledge Check (README.md)")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Jul 19")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "View Module 7 Assignment 7A PDF",
      })
    );

    expect(
      screen.getByTitle("Module7_Assignment_7A_Hello_Route.pdf")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Download Module7_Assignment_7A_Hello_Route.pdf",
      })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-7/Module7_Assignment_7A_Hello_Route.pdf"
    );
  });

  it("renders the Module 7 Assignment 7B instructions and opens its PDF", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod7 />);

    await user.click(
      screen.getByRole("button", {
        name: "Module 7 Assignment 7B: Basic Routing",
      })
    );

    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(
      screen.getByText("Part 3: Controller and Blade Views")
    ).toBeInTheDocument();
    expect(screen.getByText("hobbies.index")).toBeInTheDocument();
    expect(screen.getByText("Jul 19")).toBeInTheDocument();
    expect(screen.getByText("20 pts")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "View Module 7 Assignment 7B PDF",
      })
    );

    expect(
      screen.getByTitle("Hancharou_Siarhei_Routing_Documentation.pdf")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Download Hancharou_Siarhei_Routing_Documentation.pdf",
      })
    ).toHaveAttribute(
      "href",
      "/code-playground/CS85/mod-7/Hancharou_Siarhei_Routing_Documentation.pdf"
    );
  });

  it("renders the Module 7 Laravel quiz in the module accordion", async () => {
    const user = userEvent.setup();

    render(<AssignmentMod7 />);

    await user.click(
      screen.getByRole("button", { name: "Quiz: Module 7 Laravel" })
    );

    expect(
      screen.getByRole("heading", { name: "Quiz: Module 7 Laravel" })
    ).toBeInTheDocument();
    expect(screen.getByText("Access code: START")).toBeInTheDocument();
    expect(screen.getAllByText("24", { selector: "dd" })).toHaveLength(2);
  });
});
