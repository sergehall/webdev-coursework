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
      </Routes>
    </MemoryRouter>
  );
}

describe("<CourseworkPage />", () => {
  it.each([
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

  it("keeps unavailable coursework blocks non-clickable", () => {
    renderCourseworkPage();

    expect(screen.getByText(/PHP Programming/i)).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /CS 85[\s\S]*PHP Programming/i,
      })
    ).not.toBeInTheDocument();
  });
});
