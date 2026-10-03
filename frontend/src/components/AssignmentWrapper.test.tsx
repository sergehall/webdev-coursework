import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";

import AssignmentWrapper from "./AssignmentWrapper";

const { fetchProgressMock } = vi.hoisted(() => ({
  fetchProgressMock: vi.fn(),
}));

vi.mock("@/api/quiz-progress", () => ({
  fetchProgress: fetchProgressMock,
  markModuleCompleted: vi.fn(),
  unmarkModuleCompleted: vi.fn(),
}));

vi.mock("@/hooks/useClientId", () => ({
  useClientId: () => "test-client",
}));

beforeEach(() => {
  fetchProgressMock.mockReset();
  fetchProgressMock.mockResolvedValue([]);
});

test("loads course progress once for the assignment shell", async () => {
  render(
    <MemoryRouter initialEntries={["/coursework/CS56/assignment"]}>
      <Routes>
        <Route
          path="/coursework/:courseId/assignment"
          element={<AssignmentWrapper />}
        />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByRole("heading", { name: "Course progress" });
  await waitFor(() => {
    expect(fetchProgressMock).toHaveBeenCalledTimes(1);
  });
  expect(fetchProgressMock).toHaveBeenCalledWith("test-client", "CS56");
  expect(screen.getByRole("link", { name: "Mod 15" })).toBeInTheDocument();
});
