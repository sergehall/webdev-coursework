import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const { renderMock, createRootMock, applySavedThemeMock, envSafeParseMock } =
  vi.hoisted(() => {
    const render = vi.fn();
    const createRoot = vi.fn(() => ({ render }));
    const applySavedTheme = vi.fn();
    const envSafeParse = vi.fn();

    return {
      renderMock: render,
      createRootMock: createRoot,
      applySavedThemeMock: applySavedTheme,
      envSafeParseMock: envSafeParse,
    };
  });

vi.mock("react-dom/client", () => ({
  default: { createRoot: createRootMock },
  createRoot: createRootMock,
}));

vi.mock("./utils/theme", () => ({
  applySavedTheme: applySavedThemeMock,
}));

vi.mock("./config/env/env.schema", () => ({
  envSchema: { safeParse: envSafeParseMock },
}));

vi.mock("./App", () => ({
  default: () => null,
}));

vi.mock("@/AppProviders", () => ({
  default: ({ children }: { children: unknown }) => children,
}));

describe("main startup", () => {
  beforeEach(() => {
    vi.resetModules();
    createRootMock.mockClear();
    renderMock.mockClear();
    applySavedThemeMock.mockClear();
    envSafeParseMock.mockReset();
    envSafeParseMock.mockReturnValue({ success: true, data: {} });
    document.body.innerHTML = '<div id="root"></div>';
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mounts the app into #root", async () => {
    await import("./main");

    expect(applySavedThemeMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById("root")
    );
    expect(renderMock).toHaveBeenCalledTimes(1);
  });

  it("throws when #root container is missing", async () => {
    document.body.innerHTML = "";

    await expect(import("./main")).rejects.toThrow(
      "Root container #root not found"
    );
    expect(createRootMock).not.toHaveBeenCalled();
  });

  it("fails before mounting when runtime environment validation fails", async () => {
    envSafeParseMock.mockReturnValue({
      success: false,
      error: {
        issues: [
          {
            path: ["VITE_QUIZ_SECRET"],
            message: "VITE_QUIZ_SECRET must be defined and not empty",
          },
        ],
      },
    });

    await expect(import("./main")).rejects.toThrow(
      "Invalid environment variables:\n  • VITE_QUIZ_SECRET: VITE_QUIZ_SECRET must be defined and not empty"
    );
    expect(applySavedThemeMock).not.toHaveBeenCalled();
    expect(createRootMock).not.toHaveBeenCalled();
  });

  it("continues mounting when applying the saved theme fails", async () => {
    const themeError = new Error("Storage unavailable");
    applySavedThemeMock.mockImplementationOnce(() => {
      throw themeError;
    });

    await import("./main");

    expect(console.error).toHaveBeenCalledWith(
      "Failed to apply saved theme:",
      themeError
    );
    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById("root")
    );
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
