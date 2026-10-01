import { StrictMode } from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useQrVisit } from "./useQrVisit";
function Visit() {
  useQrVisit();
  return <p>Presentation</p>;
}
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("QR visit tracking", () => {
  it("sends only one anonymous event in StrictMode for a QR visit", async () => {
    vi.stubEnv("VITE_QR_ANALYTICS_ENABLED", "true");
    const fetcher = vi.fn().mockResolvedValue(new Response());
    vi.stubGlobal("fetch", fetcher);
    render(
      <StrictMode>
        <MemoryRouter initialEntries={["/?source=esl10g-presentation-qr"]}>
          <Visit />
        </MemoryRouter>
      </StrictMode>
    );
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    const options = fetcher.mock.calls[0][1];
    expect(options.credentials).toBe("omit");
    expect(Object.keys(JSON.parse(options.body)).sort()).toEqual([
      "campaign",
      "eventId",
    ]);
  });
  it("does not track ordinary page opens", () => {
    vi.stubEnv("VITE_QR_ANALYTICS_ENABLED", "true");
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(
      <MemoryRouter>
        <Visit />
      </MemoryRouter>
    );
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("keeps the presentation usable when collection fails", async () => {
    vi.stubEnv("VITE_QR_ANALYTICS_ENABLED", "true");
    const fetcher = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetcher);
    const view = render(
      <MemoryRouter initialEntries={["/?source=esl10g-presentation-qr"]}>
        <Visit />
      </MemoryRouter>
    );
    await waitFor(() => expect(fetcher).toHaveBeenCalledOnce());
    expect(view.getByText("Presentation")).toBeInTheDocument();
  });
});
