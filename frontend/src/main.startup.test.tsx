import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const { renderMock, createRootMock, applySavedThemeMock } = vi.hoisted(() => {
  const render = vi.fn();
  const createRoot = vi.fn(() => ({ render }));
  const applySavedTheme = vi.fn();

  return {
    renderMock: render,
    createRootMock: createRoot,
    applySavedThemeMock: applySavedTheme,
  };
});

vi.mock("react-dom/client", () => ({
  default: { createRoot: createRootMock },
  createRoot: createRootMock,
}));

vi.mock("./utils/theme", () => ({
  applySavedTheme: applySavedThemeMock,
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
});
