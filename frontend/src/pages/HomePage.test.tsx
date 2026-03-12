import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("shows new course accordions for CS 85, CS 79D, and CS 79C", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("button", { name: /CS 85 - PHP Programming/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /CS 79D - Security in Amazon Web Services/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /CS 79C - Compute Engines in Amazon Web Services/i,
      })
    ).toBeInTheDocument();
  });

  it("expands and switches accordion content on selection", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    await user.click(
      screen.getByRole("button", { name: /CS 85 - PHP Programming/i })
    );
    expect(
      screen.getByText(/PHP Syntax, Control Flow & Reusable Functions/i)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /CS 79D - Security in Amazon Web Services/i,
      })
    );
    expect(
      screen.getByText(/AWS Shared Responsibility Model in Real Deployments/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/PHP Syntax, Control Flow & Reusable Functions/i)
    ).not.toBeInTheDocument();
  });
});
