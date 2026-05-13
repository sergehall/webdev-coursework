import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import ProgressProvider from "./ProgressProvider";
import { ProgressContext } from "./ProgressContext";

const {
  fetchProgressMock,
  markModuleCompletedMock,
  unmarkModuleCompletedMock,
  useClientIdMock,
} = vi.hoisted(() => ({
  fetchProgressMock: vi.fn(),
  markModuleCompletedMock: vi.fn(),
  unmarkModuleCompletedMock: vi.fn(),
  useClientIdMock: vi.fn(),
}));

vi.mock("@/api/quiz-progress", () => ({
  fetchProgress: fetchProgressMock,
  markModuleCompleted: markModuleCompletedMock,
  unmarkModuleCompleted: unmarkModuleCompletedMock,
}));

vi.mock("@/hooks/useClientId", () => ({
  useClientId: useClientIdMock,
}));

type Deferred<T> = {
  readonly promise: Promise<T>;
  readonly resolve: (value: T) => void;
  readonly reject: (reason?: unknown) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function ProgressStateProbe({ moduleNumber = 2 }: { moduleNumber?: number }) {
  const context = useContext(ProgressContext);
  const navigate = useNavigate();
  const [actionError, setActionError] = useState("none");

  if (!context) {
    throw new Error("ProgressStateProbe must be used within ProgressProvider");
  }

  const completed =
    context.completedModules.length > 0
      ? context.completedModules.join(",")
      : "none";

  return (
    <section>
      <output aria-label="course">{context.courseId ?? "none"}</output>
      <output aria-label="completed modules">{completed}</output>
      <output aria-label="loading state">
        {context.isLoadingProgress ? "loading" : "idle"}
      </output>
      <output aria-label="progress error">
        {context.progressError?.message ?? "none"}
      </output>
      <output aria-label="action error">{actionError}</output>

      <button
        type="button"
        onClick={() => navigate("/coursework/CS80/assignment/1")}
      >
        Go to CS80
      </button>
      <button
        type="button"
        onClick={async () => {
          try {
            setActionError("none");
            await context.markAsCompleted(moduleNumber);
          } catch (error) {
            setActionError(getErrorMessage(error));
          }
        }}
      >
        Mark module
      </button>
      <button
        type="button"
        onClick={async () => {
          try {
            setActionError("none");
            await context.unmarkAsCompleted(moduleNumber);
          } catch (error) {
            setActionError(getErrorMessage(error));
          }
        }}
      >
        Unmark module
      </button>
    </section>
  );
}

function renderProgressProvider(
  initialEntry = "/coursework/CS81/assignment/1",
  moduleNumber = 2
) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/coursework/:courseId/assignment/:id"
          element={
            <ProgressProvider>
              <ProgressStateProbe moduleNumber={moduleNumber} />
            </ProgressProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProgressProvider state", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useClientIdMock.mockReturnValue("client-1");
    fetchProgressMock.mockResolvedValue([]);
    markModuleCompletedMock.mockResolvedValue(undefined);
    unmarkModuleCompletedMock.mockResolvedValue(undefined);
  });

  test("loads and normalizes completed modules for the active course", async () => {
    fetchProgressMock.mockResolvedValue([3, 1, 3, 0, 13, 2.5]);

    renderProgressProvider();

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent(
        "1,3"
      );
    });

    expect(screen.getByLabelText("course")).toHaveTextContent("CS81");
    expect(screen.getByLabelText("loading state")).toHaveTextContent("idle");
    expect(fetchProgressMock).toHaveBeenCalledWith("client-1", "CS81");
  });

  test("optimistically marks a module and ignores duplicate marks while the mutation is pending", async () => {
    const user = userEvent.setup();
    const pendingMark = createDeferred<void>();
    markModuleCompletedMock.mockReturnValue(pendingMark.promise);

    renderProgressProvider();

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent(
        "none"
      );
    });

    await user.click(screen.getByRole("button", { name: /^mark module$/i }));
    await user.click(screen.getByRole("button", { name: /^mark module$/i }));

    expect(screen.getByLabelText("completed modules")).toHaveTextContent("2");
    expect(markModuleCompletedMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      pendingMark.resolve();
    });

    expect(screen.getByLabelText("completed modules")).toHaveTextContent("2");
    expect(screen.getByLabelText("action error")).toHaveTextContent("none");
  });

  test("rolls back an optimistic mark when the API call fails", async () => {
    const user = userEvent.setup();
    const pendingMark = createDeferred<void>();
    markModuleCompletedMock.mockReturnValue(pendingMark.promise);

    renderProgressProvider();

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent(
        "none"
      );
    });

    await user.click(screen.getByRole("button", { name: /^mark module$/i }));

    expect(screen.getByLabelText("completed modules")).toHaveTextContent("2");

    await act(async () => {
      pendingMark.reject(new Error("mark failed"));
    });

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent(
        "none"
      );
    });
    expect(screen.getByLabelText("action error")).toHaveTextContent(
      "mark failed"
    );
  });

  test("rolls back an optimistic unmark when the API call fails", async () => {
    const user = userEvent.setup();
    const pendingUnmark = createDeferred<void>();
    fetchProgressMock.mockResolvedValue([2]);
    unmarkModuleCompletedMock.mockReturnValue(pendingUnmark.promise);

    renderProgressProvider();

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent("2");
    });

    await user.click(screen.getByRole("button", { name: /unmark module/i }));

    expect(screen.getByLabelText("completed modules")).toHaveTextContent(
      "none"
    );

    await act(async () => {
      pendingUnmark.reject(new Error("unmark failed"));
    });

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent("2");
    });
    expect(screen.getByLabelText("action error")).toHaveTextContent(
      "unmark failed"
    );
  });

  test("does not call unmark API when the module is already incomplete", async () => {
    const user = userEvent.setup();

    renderProgressProvider();

    await waitFor(() => {
      expect(screen.getByLabelText("completed modules")).toHaveTextContent(
        "none"
      );
    });

    await user.click(screen.getByRole("button", { name: /unmark module/i }));

    expect(unmarkModuleCompletedMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("completed modules")).toHaveTextContent(
      "none"
    );
  });

  test("discards stale progress responses after navigating to another course", async () => {
    const user = userEvent.setup();
    const cs81Progress = createDeferred<number[]>();
    const cs80Progress = createDeferred<number[]>();

    fetchProgressMock
      .mockReturnValueOnce(cs81Progress.promise)
      .mockReturnValueOnce(cs80Progress.promise);

    renderProgressProvider();

    expect(screen.getByLabelText("course")).toHaveTextContent("CS81");

    await user.click(screen.getByRole("button", { name: /go to cs80/i }));

    await waitFor(() => {
      expect(fetchProgressMock).toHaveBeenCalledWith("client-1", "CS80");
    });

    await act(async () => {
      cs80Progress.resolve([1]);
    });

    await waitFor(() => {
      expect(screen.getByLabelText("course")).toHaveTextContent("CS80");
      expect(screen.getByLabelText("completed modules")).toHaveTextContent("1");
    });

    await act(async () => {
      cs81Progress.resolve([2, 3]);
    });

    expect(screen.getByLabelText("course")).toHaveTextContent("CS80");
    expect(screen.getByLabelText("completed modules")).toHaveTextContent("1");
  });
});
