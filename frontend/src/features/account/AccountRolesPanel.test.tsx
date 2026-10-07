import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import AccountRolesPanel from "./AccountRolesPanel";

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  delete (HTMLDialogElement.prototype as { showModal?: () => void }).showModal;
});

it("recovers from a failed load and shows an empty account list", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(new Response("{}", { status: 503 }))
    .mockResolvedValueOnce(
      new Response('{"page":1,"entries":[],"hasMore":false}')
    );
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
    return new Response(JSON.stringify({ page: 1, entries, hasMore: false }));
  });
  vi.stubGlobal("fetch", fetcher);
  render(<AccountRolesPanel />);
  await screen.findByText("Primary admin");
  expect(
    screen.queryByRole("button", { name: "Make client" })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Make admin" }));
  const dialog = screen.getByRole("dialog", {
    name: "Change alex to admin?",
  });
  expect(dialog).toHaveAttribute("open");
  fireEvent(dialog, new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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

it("searches all accounts on the server and keeps the filter after a role change", async () => {
  const match = {
    id: "123e4567-e89b-42d3-a456-426614174001",
    displayName: "Taylor",
    username: "taylor",
    email: "taylor@example.test",
    role: "client",
    createdAt: "2026-09-01T22:00:00.000Z",
  };
  const fetcher = vi.fn(async (url: string, options: RequestInit) => {
    if (options.method === "PUT") {
      match.role = "admin";
      return new Response("{}");
    }
    const search = new URL(url, "http://localhost").searchParams.get("search");
    return new Response(
      JSON.stringify({
        page: 1,
        entries: search ? [match] : [],
        hasMore: false,
      })
    );
  });
  vi.stubGlobal("fetch", fetcher);
  render(<AccountRolesPanel />);
  await screen.findByText("No accounts found.");
  fireEvent.change(screen.getByRole("searchbox", { name: "Search users" }), {
    target: { value: "TAYLOR@EXAMPLE.TEST" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));
  await screen.findByText("taylor@example.test");
  expect(fetcher.mock.calls.at(-1)?.[0]).toContain(
    "search=TAYLOR%40EXAMPLE.TEST"
  );
  fireEvent.click(screen.getByRole("button", { name: "Make admin" }));
  fireEvent.click(screen.getByRole("button", { name: "Confirm role change" }));
  await screen.findByRole("button", { name: "Make client" });
  expect(fetcher.mock.calls.at(-1)?.[0]).toContain(
    "search=TAYLOR%40EXAMPLE.TEST"
  );
  fireEvent.click(screen.getByRole("button", { name: "Clear" }));
  await screen.findByText("No accounts found.");
  expect(fetcher.mock.calls.at(-1)?.[0]).not.toContain("search=");
});

it("shows ten latest accounts and navigates pages before applying a search", async () => {
  const fetcher = vi.fn(async (url: string) => {
    const params = new URL(url, "http://localhost").searchParams;
    const page = Number(params.get("page"));
    const search = params.get("search");
    const entries = search
      ? [
          {
            id: "older",
            username: "taylor",
            displayName: "Taylor",
            email: null,
            role: "client",
            createdAt: "2020-01-01T00:00:00.000Z",
          },
        ]
      : Array.from({ length: page === 1 ? 10 : 1 }, (_, index) => ({
          id: `${page}-${index}`,
          username: `user-${page}-${index}`,
          displayName: `User ${page}-${index}`,
          email: null,
          role: "client",
          createdAt: "2026-10-06T22:00:00.000Z",
        }));
    return new Response(
      JSON.stringify({ page, entries, hasMore: !search && page === 1 })
    );
  });
  vi.stubGlobal("fetch", fetcher);
  render(<AccountRolesPanel />);
  await screen.findByText("User 1-0");
  expect(screen.getAllByRole("row")).toHaveLength(11);
  expect(screen.getByText("Page 1")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  await screen.findByText("User 2-0");
  expect(screen.getByText("Page 2")).toBeInTheDocument();
  expect(screen.queryByText("User 1-0")).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole("searchbox", { name: "Search users" }), {
    target: { value: "taylor" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));
  await screen.findByText("Taylor");
  expect(screen.getByText("Page 1")).toBeInTheDocument();
  expect(fetcher.mock.calls.at(-1)?.[0]).toContain("search=taylor");
});
