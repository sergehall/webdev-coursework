import "@testing-library/jest-dom";
import "whatwg-fetch";
import { vi } from "vitest";

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
    }),
  });
}

if (!window.scrollTo) {
  window.scrollTo = vi.fn();
}

vi.mock("canvas-confetti", () => ({
  default: () => {},
}));

if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);

    constructor() {}
  }

  globalThis.IntersectionObserver = IntersectionObserverMock;
}
