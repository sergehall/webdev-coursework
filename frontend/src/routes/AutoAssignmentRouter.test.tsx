import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AutoAssignmentRouter from "@/routes/AutoAssignmentRouter";

const {
  assignmentComponentsMock,
  useCompletedModulesMock,
  MainAssignment,
  PlaceholderAssignment,
} = vi.hoisted(() => {
  const assignmentComponents = vi.fn();
  const useCompletedModules = vi.fn();
  const Main = () => <div>Main assignment content</div>;
  const Placeholder = () => <div>Placeholder assignment content</div>;

  return {
    assignmentComponentsMock: assignmentComponents,
    useCompletedModulesMock: useCompletedModules,
    MainAssignment: Main,
    PlaceholderAssignment: Placeholder,
  };
});

vi.mock("@/courses/assignment-registry/assignmentComponents", () => ({
  assignmentComponents: assignmentComponentsMock,
}));

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: useCompletedModulesMock,
}));

function renderRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/coursework/:courseId/assignment/:id"
          element={<AutoAssignmentRouter />}
        />
        <Route
          path="/coursework/:courseId/assignment/completed"
          element={<div>Completed summary page</div>}
        />
      </Routes>
    </MemoryRouter>
  );
}

function mockAssignmentEntry() {
  assignmentComponentsMock.mockReturnValue({
    main: MainAssignment as unknown as React.LazyExoticComponent<React.FC>,
    placeholder:
      PlaceholderAssignment as unknown as React.LazyExoticComponent<React.FC>,
  });
}

describe("AutoAssignmentRouter", () => {
  beforeEach(() => {
    assignmentComponentsMock.mockReset();
    useCompletedModulesMock.mockReset();
    useCompletedModulesMock.mockReturnValue({ completedModules: [] });
    mockAssignmentEntry();
  });

  it("renders the unlocked assignment component for the first module", async () => {
    renderRouter("/coursework/CS81/assignment/1");

    expect(await screen.findByText(/main assignment content/i)).toBeVisible();
    expect(assignmentComponentsMock).toHaveBeenCalledWith("1", "CS 81");
  });

  it("renders the placeholder component for a locked module", async () => {
    renderRouter("/coursework/CS81/assignment/2");

    expect(
      await screen.findByText(/placeholder assignment content/i)
    ).toBeVisible();
  });

  it("renders an error state when the course id is invalid", async () => {
    renderRouter("/coursework/INVALID/assignment/1");

    expect(await screen.findByText(/invalid course id/i)).toBeVisible();
    expect(assignmentComponentsMock).not.toHaveBeenCalled();
  });

  it("renders an error state when the module cannot be resolved", async () => {
    assignmentComponentsMock.mockReturnValue(undefined);

    renderRouter("/coursework/CS81/assignment/99");

    expect(await screen.findByText(/failed to load module/i)).toBeVisible();
  });

  it("redirects to the completed page when all modules are finished", async () => {
    useCompletedModulesMock.mockReturnValue({
      completedModules: Array.from({ length: 12 }, (_, index) => index + 1),
    });

    renderRouter("/coursework/CS81/assignment/12");

    expect(await screen.findByText(/completed summary page/i)).toBeVisible();
  });
});
