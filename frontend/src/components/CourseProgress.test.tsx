import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import CourseProgress from "./CourseProgress";

describe("CourseProgress", () => {
  test("presents module progress once with accessible values", () => {
    render(<CourseProgress completedModules={8} totalModules={15} />);

    expect(
      screen.getByRole("heading", { name: "Course progress" })
    ).toBeInTheDocument();
    expect(screen.getByText("8 of 15 modules completed")).toBeInTheDocument();
    expect(screen.getByText("53%")).toBeInTheDocument();
    expect(screen.getByText("7 modules remaining")).toBeInTheDocument();

    const progressbar = screen.getByRole("progressbar", {
      name: "Course progress",
    });
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "15");
    expect(progressbar).toHaveAttribute("aria-valuenow", "8");
    expect(progressbar).toHaveAttribute(
      "aria-valuetext",
      "8 of 15 modules completed"
    );
  });

  test("shows an intentional loading state without zero-value progress", () => {
    const { container } = render(
      <CourseProgress completedModules={0} totalModules={15} isLoading />
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading course progress"
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
    expect(container.querySelector("section")).toHaveAttribute(
      "aria-busy",
      "true"
    );
  });

  test("reports completion without a remaining-module count", () => {
    render(<CourseProgress completedModules={15} totalModules={15} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("All modules completed")).toBeInTheDocument();
    expect(screen.queryByText(/modules remaining/i)).not.toBeInTheDocument();
  });

  test("normalizes invalid counts into safe progressbar boundaries", () => {
    const { rerender } = render(
      <CourseProgress completedModules={20} totalModules={15} />
    );

    const progressbar = screen.getByRole("progressbar", {
      name: "Course progress",
    });
    expect(progressbar).toHaveAttribute("aria-valuemax", "15");
    expect(progressbar).toHaveAttribute("aria-valuenow", "15");
    expect(screen.getByText("100%")).toBeInTheDocument();

    rerender(<CourseProgress completedModules={-3} totalModules={0} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
    expect(
      screen.getByText("Course progress is unavailable")
    ).toBeInTheDocument();
  });

  test("uses singular copy when one module remains", () => {
    render(<CourseProgress completedModules={14} totalModules={15} />);

    expect(screen.getByText("1 module remaining")).toBeInTheDocument();
  });
});
