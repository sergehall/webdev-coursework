import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import AccountRolesPanel from "./AccountRolesPanel";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("recovers from a failed load and shows an empty account list", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(new Response("{}", { status: 503 }))
    .mockResolvedValueOnce(new Response("[]"));
  vi.stubGlobal("fetch", fetcher);
  render(<AccountRolesPanel />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading accounts");
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Unable to load accounts"
  );
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(await screen.findByText("No accounts found.")).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("protects the primary admin and confirms before changing a client role", async () => {
  const entries = [
    {
      id: "00000000-0000-4000-8000-000000000001",
      displayName: "Primary",
      username: "primary",
      email: null,
      role: "admin",
      createdAt: "2026-10-06T22:00:00.000Z",
    },
    {
      id: "123e4567-e89b-42d3-a456-426614174000",
      displayName: "Alex",
      username: "alex",
      email: null,
      role: "client",
      createdAt: "2026-10-06T22:00:00.000Z",
    },
  ];
  const fetcher = vi.fn(async (_url: string, options: RequestInit) => {
    if (options.method === "PUT") {
      entries[1].role = "admin";
      return new Response("{}");
    }
    return new Response(JSON.stringify(entries));
  });
  vi.stubGlobal("fetch", fetcher);
  render(<AccountRolesPanel />);
  await screen.findByText("Primary admin");
  expect(
    screen.queryByRole("button", { name: "Make client" })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Make admin" }));
  expect(fetcher).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("button", { name: "Confirm role change" }));
  await screen.findByRole("button", { name: "Make client" });
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(3));
  const mutation = fetcher.mock.calls.find(
    ([, options]) => options.method === "PUT"
  );
  expect(JSON.parse(String(mutation?.[1].body))).toEqual({ role: "admin" });
});
