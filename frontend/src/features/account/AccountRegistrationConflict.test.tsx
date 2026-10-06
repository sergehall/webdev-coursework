import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";

import AccountAuthPage from "./AccountAuthPage";
import { OwnerContext, type OwnerState } from "./owner-context";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each([
  ["EMAIL_ALREADY_REGISTERED", "email is already registered locally"],
  ["USERNAME_TAKEN", "username is already taken locally"],
])("shows %s without claiming an email was sent", async (code, message) => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation((url: string) =>
      Promise.resolve(
        String(url).endsWith("/register")
          ? new Response(JSON.stringify({ code }), { status: 409 })
          : new Response(
              JSON.stringify({
                githubEnabled: false,
                registrationEnabled: true,
                turnstileRequired: false,
                turnstileSiteKey: "",
              })
            )
      )
    )
  );
  const owner: OwnerState = {
    session: null,
    status: "anonymous",
    error: "",
    refresh: vi.fn(),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <MemoryRouter>
      <OwnerContext.Provider value={owner}>
        <AccountAuthPage mode="register" />
      </OwnerContext.Provider>
    </MemoryRouter>
  );
  await screen.findByRole("button", { name: "Sign up" });
  for (const [label, value] of [
    ["Username", "student"],
    ["Email", "student@example.test"],
    ["Password", "student private password"],
    ["Confirm password", "student private password"],
  ])
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(message);
  expect(screen.queryByText(/Check your inbox/)).not.toBeInTheDocument();
  if (code === "EMAIL_ALREADY_REGISTERED")
    expect(
      screen.getByRole("link", { name: "Resend confirmation email" })
    ).toBeInTheDocument();
});
