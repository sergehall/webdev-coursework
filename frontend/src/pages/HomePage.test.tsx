import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import * as HomePageModule from "./HomePage";

import { verifiedHomeCourseStacks } from "@/features/home/home-course-stacks.test-data";
import { renderWithProviders } from "@/test/renderWithProviders";

const HomePage = HomePageModule.default;

describe("<HomePage />", () => {
  it("introduces the academic portfolio with clear actions and evidence", () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /From SMC coursework to full-stack web engineering/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(/I.m Serge.*Web Development coursework/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Explore coursework/i })
    ).toHaveAttribute("href", "/coursework");
    expect(
      screen.getByRole("link", { name: /View projects/i })
    ).toHaveAttribute("href", "/projects");

    const snapshot = screen.getByRole("complementary", {
      name: /Academic portfolio snapshot/i,
    });

    for (const value of ["10", "103", "128", "9"]) {
      expect(within(snapshot).getByText(value)).toBeInTheDocument();
    }
  });

  it("shows the featured applied projects", () => {
    renderWithProviders(<HomePage />);

    for (const project of [
      "AWS Learning Portal",
      "SERGIOARTG Platform",
      "Lens Lounge",
    ]) {
      expect(
        screen.getByRole("heading", { name: project })
      ).toBeInTheDocument();
    }
  });

  it("shows an accordion for every documented course", () => {
    renderWithProviders(<HomePage />);

    for (const { course } of verifiedHomeCourseStacks) {
      expect(screen.getByRole("button", { name: course })).toBeInTheDocument();
    }
  });

  it.each(verifiedHomeCourseStacks)(
    "shows the verified technology stack for $course",
    async ({ course, technologies, removedTechnologies }) => {
      const user = userEvent.setup();

      renderWithProviders(<HomePage />);
      await user.click(screen.getByRole("button", { name: course }));

      for (const technology of technologies) {
        expect(screen.getByText(technology)).toBeInTheDocument();
      }

      for (const removedTechnology of removedTechnologies) {
        expect(screen.queryByText(removedTechnology)).not.toBeInTheDocument();
      }
    }
  );

  it("links an expanded course to assignments and the degree pathway", async () => {
    const user = userEvent.setup();

    renderWithProviders(<HomePage />);
    await user.click(
      screen.getByRole("button", { name: "CS 85 - PHP Programming" })
    );

    expect(
      screen.getByRole("link", { name: /View assignments/i })
    ).toHaveAttribute("href", "/coursework/CS85/assignment");
    expect(
      screen.getByRole("link", { name: /Degree pathway/i })
    ).toHaveAttribute("href", "/web-developer-path");
  });

  it("renders only the selected course technology stack", async () => {
    const user = userEvent.setup();

    renderWithProviders(<HomePage />);

    await user.click(
      screen.getByRole("button", {
        name: "CS 79C - Compute Engines in Amazon Web Services",
      })
    );
    expect(
      screen.getByText(/AWS Compute Services & Scalable Architecture/i)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "CS 87A - Python Programming",
      })
    );
    expect(
      screen.getByText(/Python 3, IDLE & Script Execution/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/AWS Compute Services & Scalable Architecture/i)
    ).not.toBeInTheDocument();
  });

  it("refreshes the home page after a strong downward pull", () => {
    const reloadSpy = vi.fn();

    renderWithProviders(
      <HomePageModule.HomePageContent onRefresh={reloadSpy} />
    );

    const page = screen.getByTestId("home-page");

    fireEvent.touchStart(page, {
      touches: [{ clientX: 20, clientY: 20 }],
    });
    fireEvent.touchMove(page, {
      touches: [{ clientX: 24, clientY: 280 }],
    });

    expect(screen.getByText(/Release to refresh/i)).toBeInTheDocument();

    fireEvent.touchEnd(page);

    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });

  it("does not refresh after a short pull", () => {
    const reloadSpy = vi.fn();

    renderWithProviders(
      <HomePageModule.HomePageContent onRefresh={reloadSpy} />
    );

    const page = screen.getByTestId("home-page");

    fireEvent.touchStart(page, {
      touches: [{ clientX: 30, clientY: 30 }],
    });
    fireEvent.touchMove(page, {
      touches: [{ clientX: 32, clientY: 120 }],
    });

    expect(screen.getByText(/Pull down to refresh/i)).toBeInTheDocument();

    fireEvent.touchEnd(page);

    expect(reloadSpy).not.toHaveBeenCalled();
    expect(screen.getByText(/Pull down to refresh/i)).toHaveClass("opacity-0");
  });
});
