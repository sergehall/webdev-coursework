import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import ModuleCompletionButton from "./ModuleCompletionButton";

import { useCompletedModules } from "@/hooks/useCompletedModules";

vi.mock("@/hooks/useCompletedModules", () => ({
  useCompletedModules: vi.fn(),
}));

const useCompletedModulesMock = vi.mocked(useCompletedModules);

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

describe("ModuleCompletionButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("disables the button and shows pending feedback while marking a module", async () => {
    const user = userEvent.setup();
    const markAsCompleted = vi.fn();
    const unmarkAsCompleted = vi.fn();
    const pendingMark = createDeferred<void>();

    markAsCompleted.mockReturnValue(pendingMark.promise);
    useCompletedModulesMock.mockReturnValue({
      courseId: "CS81",
      completedModules: [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: 12,
      isLoadingProgress: false,
      progressError: null,
      retryProgress: vi.fn(),
    });

    render(<ModuleCompletionButton moduleId={3} />);

    await user.click(
      screen.getByRole("button", { name: /complete module 3/i })
    );

    const pendingButton = screen.getByRole("button", { name: /saving/i });
    expect(markAsCompleted).toHaveBeenCalledWith(3);
    expect(unmarkAsCompleted).not.toHaveBeenCalled();
    expect(pendingButton).toBeDisabled();
    expect(pendingButton).toHaveAttribute("aria-busy", "true");

    pendingMark.resolve();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /complete module 3/i })
      ).not.toBeDisabled();
    });
  });

  test("shows an accessible error when the progress mutation fails", async () => {
    const user = userEvent.setup();
    const markAsCompleted = vi
      .fn()
      .mockRejectedValue(new Error("Progress API failed"));
    const unmarkAsCompleted = vi.fn();

    useCompletedModulesMock.mockReturnValue({
      courseId: "CS81",
      completedModules: [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: 12,
      isLoadingProgress: false,
      progressError: null,
      retryProgress: vi.fn(),
    });

    render(<ModuleCompletionButton moduleId={3} />);

    await user.click(
      screen.getByRole("button", { name: /complete module 3/i })
    );

    const alert = await screen.findByRole("alert");
    const button = screen.getByRole("button", { name: /complete module 3/i });

    expect(alert).toHaveTextContent(
      "Could not save progress. Please try again."
    );
    expect(button).toHaveAttribute("aria-describedby", alert.id);
    expect(button).not.toBeDisabled();
  });

  test("clears pending state after a successful mutation in React StrictMode", async () => {
    const user = userEvent.setup();
    const markAsCompleted = vi.fn().mockResolvedValue(undefined);
    const unmarkAsCompleted = vi.fn();

    useCompletedModulesMock.mockReturnValue({
      courseId: "CS81",
      completedModules: [],
      markAsCompleted,
      unmarkAsCompleted,
      maxModules: 12,
      isLoadingProgress: false,
      progressError: null,
      retryProgress: vi.fn(),
    });

    render(
      <StrictMode>
        <ModuleCompletionButton moduleId={3} />
      </StrictMode>
    );

    await user.click(
      screen.getByRole("button", { name: /complete module 3/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /complete module 3/i })
      ).not.toBeDisabled();
    });
    expect(
      screen.queryByRole("button", { name: /saving/i })
    ).not.toBeInTheDocument();
  });
});
