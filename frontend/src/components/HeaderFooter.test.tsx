import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { renderWithProviders } from "@/test/renderWithProviders";

describe("portfolio shell identity", () => {
  it("uses a linked brand without creating a competing page heading", () => {
    renderWithProviders(<Header />);

    const brandLink = screen.getByRole("link", {
      name: /Web Engineering Portfolio home/i,
    });

    expect(brandLink).toHaveAttribute("href", "/");
    expect(brandLink.querySelector("img")).toHaveAttribute(
      "src",
      "/animated-wave.svg"
    );
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByText("Serge Hall")).not.toBeInTheDocument();
    expect(screen.getByText("Web Engineering Portfolio")).toBeInTheDocument();
  });

  it("identifies the site as an independent academic portfolio", () => {
    renderWithProviders(<Footer />);

    expect(
      screen.getByText(/Independent academic portfolio/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not an official SMC website/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/SergeHall"
    );
    expect(screen.getByText(/© \d{4} · Serge ·/)).toBeInTheDocument();
    expect(screen.queryByText(/Serge Hall/)).not.toBeInTheDocument();
  });
});
