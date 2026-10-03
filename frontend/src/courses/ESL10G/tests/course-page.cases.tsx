import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { renderPage } from "./renderPage";

export function registerCoursePageCases() {
  it("shows instructor, syllabus summary, and 16 weeks without the slideshow", () => {
    renderPage();
    expect(screen.getByText("Matthew Stivener")).toBeInTheDocument();
    expect(screen.getByText("ESL 10G · Section 2203")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Syllabus overview" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Course textbooks" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Elements of Success 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Pathways: Listening, Speaking, and Critical Thinking 1",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("ISBN: 9780194028202")).toBeInTheDocument();
    expect(screen.getByText("ISBN: 9780357978733")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /^Cover of / })).toHaveLength(2);
    expect(
      screen.getByRole("link", {
        name: /View Elements of Success 1 on the publisher's website/i,
      })
    ).toHaveAttribute(
      "href",
      "https://elt.oup.com/catalogue/items/global/grammar_vocabulary/elements_of_success/elements_of_success_1/9780194028202?cc=us&selLanguage=en&mode=hub&srsltid=AU7gw4WvMd70KZJz1AXSikh6Tn7PnHXMvArghg_1VI8OS53eXtaX-52a"
    );
    expect(
      screen.getByRole("link", {
        name: /View Pathways: Listening, Speaking, and Critical Thinking 1 on the publisher's website/i,
      })
    ).toHaveAttribute("href", "https://www.eltngl.com/products/9780357978733");
    expect(screen.getAllByText(/^Week \d+:/)).toHaveLength(16);
    expect(
      screen.getByText(/Presentation 1 assignment introduced/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/^Presentation 1$/)).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Presentation 1 slide viewer")
    ).not.toBeInTheDocument();
  });

  it("opens the written presentation from week 3 in a text modal with the original PDF download", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText(/Week 3: Present simple/i));
    const button = screen.getByRole("button", {
      name: "Open Presentation 1 text →",
    });
    await user.click(button);

    expect(
      screen.getByRole("dialog", { name: "File preview" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^Good morning, everyone\. My name is Sergei\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^Thank you very much for listening\./)
    ).toBeInTheDocument();
    expect(screen.queryByTitle("Presentation_1.pdf")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Presentation_1.pdf" })
    ).toHaveAttribute(
      "href",
      "/course-materials/esl10g/presentation/Presentation_1.pdf"
    );
    expect(
      screen.queryByLabelText("Presentation 1 slide viewer")
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ESL 10G" })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it("opens the slideshow from week 5", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByText(/Week 5: The Marketing Machine/i));
    const link = screen.getByRole("link", {
      name: /Open Presentation 1/i,
    });
    expect(link).toHaveAttribute("href", "/coursework/ESL10G/presentation-1");
    await user.click(link);

    expect(
      screen.getByLabelText("Presentation 1 slide viewer")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to ESL 10G/i })
    ).toHaveAttribute("href", "/coursework/ESL10G");
  });
}
