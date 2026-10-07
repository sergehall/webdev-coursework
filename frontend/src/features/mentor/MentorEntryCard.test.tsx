import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import MentorEntryCard from "./MentorEntryCard";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe("mentor public entry", () => {
  it("keeps the production card hidden until the public flag is enabled", () => {
    vi.stubEnv("DEV", false);
    vi.stubEnv("VITE_AI_MENTOR_ENABLED", "false");
    vi.stubEnv("VITE_AI_MENTOR_PUBLIC_ENABLED", "true");
    const { rerender } = render(
      <MemoryRouter>
        <MentorEntryCard />
      </MemoryRouter>
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    vi.stubEnv("VITE_AI_MENTOR_ENABLED", "true");
    vi.stubEnv("VITE_AI_MENTOR_PUBLIC_ENABLED", "false");
    rerender(
      <MemoryRouter>
        <MentorEntryCard />
      </MemoryRouter>
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    vi.stubEnv("VITE_AI_MENTOR_PUBLIC_ENABLED", "true");
    rerender(
      <MemoryRouter>
        <MentorEntryCard />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /build my learning path/i })
    ).toHaveAttribute("href", "/web-developer-path/mentor");
    expect(screen.queryByText(/preview/i)).not.toBeInTheDocument();
  });
});
