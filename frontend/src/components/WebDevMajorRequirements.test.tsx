import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import WebDevMajorRequirements from "@/components/WebDevMajorRequirements";

describe("WebDevMajorRequirements", () => {
  it("expands and collapses a base course row", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    const courseButton = screen.getByRole("button", {
      name: /CS 60/i,
    });

    await user.click(courseButton);
    expect(screen.getByText(/Skills Advisory:/i)).toBeInTheDocument();

    await user.click(courseButton);
    expect(screen.queryByText(/Skills Advisory:/i)).not.toBeInTheDocument();
  });

  it("updates group title after selecting an option", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    const groupButton = screen.getByRole("button", {
      name: /One Server Programming Course/i,
    });

    await user.click(groupButton);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "CS 85");

    expect(
      screen.getByRole("button", {
        name: /One Server Programming Course: PHP Programming/i,
      })
    ).toBeInTheDocument();
  });
});
