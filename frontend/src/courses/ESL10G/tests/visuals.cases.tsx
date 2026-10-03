import { fireEvent, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { renderPage } from "./renderPage";

export function registerVisualCases() {
  it("uses the versioned Brooklyn photo on the opening and story slides", () => {
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const openingPhoto = container.querySelector(
      '.bookend__photos--opening img[src*="brooklyn.png"]'
    );
    const imageUrl = openingPhoto?.getAttribute("src");
    expect(imageUrl).toMatch(/\/brooklyn\.png\?v=[a-f0-9]{12}$/);

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(
      screen.getByRole("img", {
        name: "A map of Europe highlighting Belarus",
      })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(
      screen.getByRole("img", {
        name: "A street scene in Brooklyn, New York",
      })
    ).toHaveAttribute("src", imageUrl);
  });

  it("highlights an early ESL teacher only on the classroom photo", () => {
    renderPage("/coursework/ESL10G/presentation-1");
    const next = screen.getByRole("button", { name: "Next slide" });
    const teacherLabel = /One of my first ESL teachers is highlighted/;

    expect(screen.queryByRole("img", { name: teacherLabel })).toBeNull();
    for (let i = 0; i < 5; i += 1) fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "Learning English at SMC" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: teacherLabel })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
    expect(screen.getByRole("img", { name: teacherLabel })).toBeInTheDocument();
    fireEvent.click(next);
    expect(screen.queryByRole("img", { name: teacherLabel })).toBeNull();
  });

  it("shows a flight from Belarus toward New York only on the Belarus slide", () => {
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const flightLabel =
      /An airplane flies from Belarus toward New York, leaving a dotted flight path/;

    expect(screen.queryByRole("img", { name: flightLabel })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("img", { name: flightLabel })).toBeInTheDocument();
    expect(
      container.querySelector(".esl10g-flight animateMotion")
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.queryByRole("img", { name: flightLabel })).toBeNull();
  });

  it("shows the Route 66 car journey only on the Los Angeles slide", () => {
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const next = screen.getByRole("button", { name: "Next slide" });
    const journeyLabel =
      /A car travels from New York through Oklahoma City, then along Route 66 to Los Angeles/;

    expect(screen.queryByRole("img", { name: journeyLabel })).toBeNull();
    for (let i = 0; i < 4; i += 1) fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "A new start in Los Angeles" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: journeyLabel })).toBeInTheDocument();
    expect(
      container.querySelector(".esl10g-route66 animateMotion")
    ).not.toBeNull();

    fireEvent.click(next);
    expect(screen.queryByRole("img", { name: journeyLabel })).toBeNull();
  });

  it("shows the climbing hiker only on the California hiking slide", () => {
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const next = screen.getByRole("button", { name: "Next slide" });
    const hikerLabel =
      /A little hiker climbs a winding trail toward a summit flag/;

    expect(screen.queryByRole("img", { name: hikerLabel })).toBeNull();
    for (let i = 0; i < 7; i += 1) fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "Life in California" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: hikerLabel })).toBeInTheDocument();
    expect(
      container.querySelector(".esl10g-hike animateMotion")
    ).not.toBeNull();

    fireEvent.click(next);
    expect(screen.queryByRole("img", { name: hikerLabel })).toBeNull();
  });

  it("introduces Matthew only on the learning together photo", () => {
    const { container } = renderPage("/coursework/ESL10G/presentation-1");
    const next = screen.getByRole("button", { name: "Next slide" });
    const matthewLabel =
      /Matthew, my current ESL teacher, is speaking to the class/;

    expect(screen.queryByRole("img", { name: matthewLabel })).toBeNull();
    for (let i = 0; i < 8; i += 1) fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: "Learning together" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: matthewLabel })).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Students talking together on the Santa Monica College campus",
      })
    ).toHaveAttribute(
      "src",
      "/course-materials/esl10g/presentation/learning-together-personalized.png"
    );

    fireEvent.click(screen.getByRole("button", { name: "Subtitles" }));
    expect(screen.getByRole("img", { name: matthewLabel })).toBeInTheDocument();
    fireEvent.click(next);
    expect(screen.queryByRole("img", { name: matthewLabel })).toBeNull();
    expect(
      container.querySelector(".bookend__photos--closing img:last-child")
    ).toHaveAttribute(
      "src",
      "/course-materials/esl10g/presentation/learning-together-personalized.png"
    );
  });
}
