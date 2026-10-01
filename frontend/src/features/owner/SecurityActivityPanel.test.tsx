import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import SecurityActivityPanel from "./SecurityActivityPanel";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("requests ten records, fetches the next page on demand and resets pagination when filtering", async () => {
  const fetcher = vi.fn().mockImplementation(() =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          entries: [
            {
              eventId: "entry",
              occurredAt: new Date().toISOString(),
              action: "owner.login",
              allowed: true,
            },
          ],
          nextCursor: "next-page",
        })
      )
    )
  );
  vi.stubGlobal("fetch", fetcher);
  render(<SecurityActivityPanel />);
  await screen.findByText("owner.login");
  expect(fetcher).toHaveBeenCalledTimes(1);
  const first = new URL(fetcher.mock.calls[0][0]);
  expect(first.searchParams.get("limit")).toBe("10");
  expect(first.searchParams.has("cursor")).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "Next page" }));
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  expect(new URL(fetcher.mock.calls[1][0]).searchParams.get("cursor")).toBe(
    "next-page"
  );
  await screen.findByText("owner.login");
  fireEvent.change(screen.getByLabelText("Activity result"), {
    target: { value: "denied" },
  });
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(3));
  const filtered = new URL(fetcher.mock.calls[2][0]);
  expect(filtered.searchParams.get("result")).toBe("denied");
  expect(filtered.searchParams.has("cursor")).toBe(false);
  expect(screen.getByText("Page 1")).toBeInTheDocument();
});
