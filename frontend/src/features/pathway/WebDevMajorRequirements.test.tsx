import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import WebDevMajorRequirements from "@/features/pathway/WebDevMajorRequirements";

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

  it("shows all four degree semesters and approved GE choices", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    expect(
      screen.getByRole("button", { name: "Associate Degree (AS)" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getAllByRole("heading", { name: /Semester [1-4]/ })
    ).toHaveLength(4);
    expect(
      screen.getByRole("button", {
        name: /CS 3 Introduction To Computer Systems/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /COUNS 20/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Elective Course/i })
    ).toHaveLength(3);
    expect(
      screen.queryByRole("button", { name: /CS 56/i })
    ).not.toBeInTheDocument();

    const expectedAreas = [
      ["1A", 414],
      ["1B", 411],
      ["3", 413],
      ["4", 412],
      ["5", 410],
      ["6", 416],
    ] as const;
    for (const [area, programId] of expectedAreas) {
      const button = screen.getByRole("button", {
        name: new RegExp(`SMC GE Area ${area}:`),
      });
      await user.click(button);
      const panel = screen.getByRole("region", {
        name: new RegExp(`SMC GE Area ${area}:`),
      });
      expect(
        within(panel).getByRole("link", { name: /View approved SMC courses/i })
      ).toHaveAttribute(
        "href",
        `https://www.smc.edu/academics/classes/program.php?id=${programId}`
      );
      await user.click(button);
    }
    expect(screen.getByText(/a GPA of 2.0 or higher/i)).toBeInTheDocument();
  });

  it("filters to the 27-unit certificate and preserves specialization choices", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    await user.click(
      screen.getByRole("button", { name: /One Server Programming Course/i })
    );
    await user.selectOptions(screen.getByRole("combobox"), "CS 85");
    await user.click(
      screen.getByRole("button", { name: "Certificate of Achievement" })
    );

    expect(
      screen.getByRole("heading", { name: "Major requirements" })
    ).toBeInTheDocument();
    expect(screen.getByText("27 units")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /COUNS 20|SMC GE Area|Elective Course/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /One Server Programming Course: PHP Programming/i,
      })
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Associate Degree (AS)" })
    );
    expect(screen.getByRole("combobox")).toHaveValue("CS 85");
  });

  it("opens nested Area 1A options without collapsing their parent", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    const areaButton = screen.getByRole("button", { name: /SMC GE Area 1A:/i });
    await user.click(areaButton);
    const area = screen.getByRole("region", { name: /SMC GE Area 1A:/i });
    expect(within(area).getAllByRole("button")).toHaveLength(3);

    const englishButton = within(area).getByRole("button", {
      name: /ENGL C1000/i,
    });
    await user.click(englishButton);
    expect(areaButton).toHaveAttribute("aria-expanded", "true");
    expect(
      within(area).getByText(/multiple measures assessment process/i)
    ).toBeInTheDocument();
    expect(within(area).getByText("Cal-GETC:")).toBeInTheDocument();

    await user.click(within(area).getByRole("button", { name: /ENGL 1D/i }));
    expect(
      within(area).getByText(/ESL 19B or Group A Placement/i)
    ).toBeInTheDocument();
    expect(englishButton).toHaveAttribute("aria-expanded", "false");

    const businessButton = within(area).getByRole("button", {
      name: /BUS 31/i,
    });
    businessButton.focus();
    await user.keyboard("{Enter}");
    expect(businessButton).toHaveAttribute("aria-expanded", "true");
    expect(within(area).queryByText("Cal-GETC:")).not.toBeInTheDocument();

    await user.click(areaButton);
    expect(
      screen.queryByRole("button", { name: /BUS 31/i })
    ).not.toBeInTheDocument();
  });

  it("filters major requirements within semesters and restores all courses without losing choices", async () => {
    const user = userEvent.setup();
    render(<WebDevMajorRequirements />);

    const filter = screen.getByRole("button", {
      name: "Show Major Requirements Only",
    });
    const showAll = screen.getByRole("button", { name: "Show All" });
    expect(showAll).toHaveAttribute("aria-pressed", "true");

    await user.click(
      screen.getByRole("button", { name: /One Server Programming Course/i })
    );
    await user.selectOptions(screen.getByRole("combobox"), "CS 85");
    await user.click(filter);

    expect(filter).toHaveAttribute("aria-pressed", "true");
    expect(showAll).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.getAllByRole("heading", { name: /Semester [1-4]/ })
    ).toHaveLength(4);
    expect(
      screen.queryByRole("button", {
        name: /CS 3 |COUNS 20|SMC GE Area|Elective Course/i,
      })
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Semester 1" })).getByText(
        "3 major units"
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Semester 2" })).getByText(
        "12 major units"
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Semester 3" })).getByText(
        "9 major units"
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Semester 4" })).getByText(
        "3 major units"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("CS 85");

    await user.click(showAll);
    expect(
      screen.getByRole("button", { name: /SMC GE Area 1A:/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /CS 3 Introduction/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Elective Course/i })
    ).toHaveLength(3);
    expect(screen.getByRole("combobox")).toHaveValue("CS 85");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Showing the full four-semester pathway"
    );
  });
});
