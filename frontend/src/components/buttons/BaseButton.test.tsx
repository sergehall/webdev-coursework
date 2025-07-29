import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaBeer } from "react-icons/fa";
import { describe, test, expect, vi } from "vitest";

import BaseButton from "./BaseButton";

describe("BaseButton", () => {
  test("renders button with text", () => {
    render(<BaseButton>Click me</BaseButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies size class for "lg"', () => {
    render(<BaseButton size="lg">Large</BaseButton>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/px-5 py-3/);
  });

  test("renders icon on the left", () => {
    render(
      <BaseButton icon={<FaBeer />} iconPosition="left">
        Cheers
      </BaseButton>
    );
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  test("renders icon on the right", () => {
    render(
      <BaseButton icon={<FaBeer />} iconPosition="right">
        Cheers
      </BaseButton>
    );
    const button = screen.getByRole("button");
    const children = Array.from(button.childNodes);
    expect(children[children.length - 1].nodeName).toBe("svg");
  });

  test("handles onClick", async () => {
    const handleClick = vi.fn();
    render(<BaseButton onClick={handleClick}>Click</BaseButton>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders <a> tag when `as="a"` and href provided', () => {
    render(
      <BaseButton as="a" href="https://example.com">
        Go to site
      </BaseButton>
    );
    const link = screen.getByRole("link", { name: /go to site/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("disables button with disabled prop", () => {
    render(<BaseButton disabled>Can&apos;t click</BaseButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
