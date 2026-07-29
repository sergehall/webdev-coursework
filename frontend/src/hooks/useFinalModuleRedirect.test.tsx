import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useFinalModuleRedirect } from "./useFinalModuleRedirect";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  useProgress: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
  useParams: () => ({ code: "CS85" }),
}));

vi.mock("./useProgress", () => ({
  useProgress: () => mocks.useProgress(),
}));

describe("useFinalModuleRedirect", () => {
  beforeEach(() => {
    mocks.navigate.mockReset();
    mocks.useProgress.mockReset();
  });

  it("does not redirect while required modules remain incomplete", () => {
    mocks.useProgress.mockReturnValue({
      completedModules: [1, 2],
      maxModules: 3,
    });

    renderHook(() => useFinalModuleRedirect(3));

    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("redirects to the course completion page after the final module", () => {
    mocks.useProgress.mockReturnValue({
      completedModules: Array.from({ length: 12 }, (_, index) => index + 1),
      maxModules: 12,
    });

    renderHook(() => useFinalModuleRedirect(12));

    expect(mocks.navigate).toHaveBeenCalledOnce();
    expect(mocks.navigate).toHaveBeenCalledWith(
      "/coursework/CS85/assignment/completed"
    );
  });

  it("requires the current module itself to be marked complete", () => {
    mocks.useProgress.mockReturnValue({
      completedModules: [1, 2, 3],
      maxModules: 3,
    });

    renderHook(() => useFinalModuleRedirect(4));

    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("reacts when progress changes during the mounted lifecycle", () => {
    let completedModules: readonly number[] = [1, 2];
    mocks.useProgress.mockImplementation(() => ({
      completedModules,
      maxModules: 3,
    }));
    const { rerender } = renderHook(() => useFinalModuleRedirect(3));

    expect(mocks.navigate).not.toHaveBeenCalled();

    completedModules = [1, 2, 3];
    rerender();

    expect(mocks.navigate).toHaveBeenCalledWith(
      "/coursework/CS85/assignment/completed"
    );
  });
});
