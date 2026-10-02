// Browser-provider lifecycle tests never load or solve a live challenge.
import { StrictMode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import TurnstileWidget from "./TurnstileWidget";
import type { TurnstileOptions } from "./turnstile-client";

let widgetOptions: TurnstileOptions;
const renderWidget = vi.fn(
  (_container: HTMLElement, options: TurnstileOptions) => {
    widgetOptions = options;
    return "widget-id";
  }
);
const removeWidget = vi.fn();
beforeEach(() => {
  renderWidget.mockClear();
  removeWidget.mockClear();
  window.turnstile = { render: renderWidget, remove: removeWidget };
});
afterEach(() => {
  cleanup();
  delete window.turnstile;
  vi.unstubAllGlobals();
});
describe("Turnstile widget lifecycle", () => {
  it("handles StrictMode mounting, expiry, retry and unmount without stale tokens", async () => {
    const onToken = vi.fn();
    const view = render(
      <StrictMode>
        <TurnstileWidget
          siteKey="public-key"
          action="account_login"
          onToken={onToken}
        />
      </StrictMode>
    );
    await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
    const old = widgetOptions;
    act(() => widgetOptions.callback("test-token"));
    expect(onToken).toHaveBeenLastCalledWith("test-token");
    act(() => widgetOptions["expired-callback"]());
    expect(onToken).toHaveBeenLastCalledWith("");
    act(() => widgetOptions["error-callback"]());
    fireEvent.click(screen.getByRole("button", { name: "Retry verification" }));
    await waitFor(() => expect(renderWidget).toHaveBeenCalledTimes(2));
    expect(removeWidget).toHaveBeenCalledWith("widget-id");
    view.unmount();
    const count = onToken.mock.calls.length;
    act(() => old.callback("stale-token"));
    expect(onToken).toHaveBeenCalledTimes(count);
  });
  it("recovers from a blocked script without duplicating successful loads", async () => {
    delete window.turnstile;
    const onToken = vi.fn();
    render(
      <TurnstileWidget
        siteKey="public-key"
        action="account_login"
        onToken={onToken}
      />
    );
    const script = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    )!;
    expect(script).toBeTruthy();
    act(() => script.dispatchEvent(new Event("error")));
    await screen.findByRole("button", { name: "Retry verification" });
    expect(onToken).toHaveBeenLastCalledWith("");
    fireEvent.click(screen.getByRole("button", { name: "Retry verification" }));
    const replacement = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    )!;
    expect(replacement).not.toBe(script);
    window.turnstile = { render: renderWidget, remove: removeWidget };
    act(() => replacement.dispatchEvent(new Event("load")));
    await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
    replacement.remove();
  });
});
