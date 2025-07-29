import { describe, expect, it } from "vitest";

import ColoredButton from "./ColoredButton";

describe("ColoredButton", () => {
  it("returns correct class for default variant", () => {
    const result = ColoredButton({});
    expect(result).toContain("bg-neutral-200");
    expect(result).toContain("text-neutral-900");
  });

  it('returns correct class for "danger" variant', () => {
    const result = ColoredButton({ variant: "danger" });
    expect(result).toContain("bg-red-100");
    expect(result).toContain("text-red-900");
  });

  it("adds extra className if provided", () => {
    const result = ColoredButton({
      variant: "primary",
      className: "rounded-lg",
    });
    expect(result).toContain("bg-blue-100");
    expect(result).toContain("rounded-lg");
  });

  it("trims resulting string", () => {
    const result = ColoredButton({ variant: "primary", className: "  px-2  " });
    expect(result.startsWith("bg-blue-100")).toBe(true);
    expect(result.includes("px-2")).toBe(true);
  });
});
