import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CourseworkPage from "./CourseworkPage";

function AssignmentRouteProbe() {
  const { courseId } = useParams<{ courseId: string }>();

  return <div>Opened assignment route for {courseId}</div>;
}

function renderCourseworkPage() {
  return render(
    <MemoryRouter initialEntries={["/coursework"]}>
      <Routes>
        <Route path="/coursework" element={<CourseworkPage />} />
        <Route
          path="/coursework/:courseId/assignment"
          element={<AssignmentRouteProbe />}
        />
        <Route path="/coursework/ESL10G" element={<div>Opened ESL 10G</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("<CourseworkPage />", () => {
  it.each([
    {
      courseCode: "CS 56",
      title: "Advanced Java Programming",
      routeCourseId: "CS56",
    },
    {
      courseCode: "CS 79C",
      title: "Compute Engines in Amazon Web Services",
      routeCourseId: "CS79C",
    },
    {
      courseCode: "CS 81",
      title: "Javascript Programming",
      routeCourseId: "CS81",
    },
    {
      courseCode: "CS 85",
      title: "PHP Programming",
      routeCourseId: "CS85",
    },
  ])(
    "opens the available $courseCode block from /coursework",
    async ({ courseCode, title, routeCourseId }) => {
      const user = userEvent.setup();

      renderCourseworkPage();

      const link = screen.getByRole("link", {
        name: new RegExp(`${courseCode}[\\s\\S]*${title}`, "i"),
      });

      expect(link).toHaveAttribute(
        "href",
        `/coursework/${routeCourseId}/assignment`
      );

      await user.click(link);

      expect(
        await screen.findByText(`Opened assignment route for ${routeCourseId}`)
      ).toBeInTheDocument();
    }
  );

  it("shows all 10 selected coursework cards without loading more", () => {
    renderCourseworkPage();

    expect(screen.getByText(/Advanced Java Programming/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Security in Amazon Web Services/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /load more/i })
    ).not.toBeInTheDocument();
  });

  it("opens the ESL 10G course details at the bottom of coursework", async () => {
    const user = userEvent.setup();
    renderCourseworkPage();

    await user.click(
      screen.getByText(/ESL 10G · Listening, Speaking & Grammar/i)
    );
    const link = screen.getByRole("link", {
      name: /Explore ESL 10G weeks and presentation/i,
    });
    expect(link).toHaveAttribute("href", "/coursework/ESL10G");
    await user.click(link);
    expect(screen.getByText("Opened ESL 10G")).toBeInTheDocument();
  });
});
