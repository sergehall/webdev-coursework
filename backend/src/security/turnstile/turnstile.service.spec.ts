// Provider-boundary tests use synthetic keys/tokens and never call live Cloudflare.
import { ConfigService } from "@nestjs/config";
import { TurnstileService } from "./turnstile.service";

const settings = {
  TURNSTILE_SECRET_KEY: "private-test-secret",
  TURNSTILE_SITE_KEY: "public-site-key",
  TURNSTILE_ALLOWED_HOSTNAMES: "localhost,webdev-coursework.com",
  NODE_ENV: "test",
};
const valid = { success: true, action: "account_login", hostname: "localhost" };
function service(values = settings) {
  return new TurnstileService(new ConfigService(values));
}
afterEach(() => jest.restoreAllMocks());
describe("Turnstile server verification", () => {
  it("returns only public configuration and uses server-side Siteverify", async () => {
    const fetcher = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(valid)));
    const turnstile = service();
    expect(turnstile.publicOptions()).toEqual({
      turnstileRequired: true,
      turnstileSiteKey: "public-site-key",
    });
    await turnstile.verify("single-use-token", "account_login");
    expect(fetcher).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({
        method: "POST",
        signal: expect.any(AbortSignal),
      })
    );
    const params = fetcher.mock.calls[0][1]!.body as URLSearchParams;
    expect(params.get("secret")).toBe(settings.TURNSTILE_SECRET_KEY);
    expect(params.get("response")).toBe("single-use-token");
  });
  it.each([undefined, "", " ", "x".repeat(2049)])(
    "rejects missing/invalid tokens before calling Cloudflare",
    async (token) => {
      const fetcher = jest.spyOn(global, "fetch");
      await expect(
        service().verify(token, "account_login")
      ).rejects.toMatchObject({ response: { code: "TURNSTILE_REJECTED" } });
      expect(fetcher).not.toHaveBeenCalled();
    }
  );
  it.each([
    { ...valid, success: false, "error-codes": ["timeout-or-duplicate"] },
    { ...valid, success: "true" },
    { ...valid, action: "account_register" },
    { ...valid, action: undefined },
    { ...valid, hostname: "attacker.example" },
    { ...valid, hostname: undefined },
    null,
  ])(
    "rejects expired/replayed, wrong-action, wrong-hostname or malformed results",
    async (result) => {
      jest
        .spyOn(global, "fetch")
        .mockResolvedValue(new Response(JSON.stringify(result)));
      await expect(
        service().verify("token", "account_login")
      ).rejects.toMatchObject({ response: { code: "TURNSTILE_REJECTED" } });
    }
  );
  it.each(["secret", "site", "host"])(
    "fails closed on incomplete %s configuration",
    async (missing) => {
      const values = {
        ...settings,
        ...(missing === "secret"
          ? { TURNSTILE_SECRET_KEY: "" }
          : missing === "site"
            ? { TURNSTILE_SITE_KEY: "" }
            : { TURNSTILE_ALLOWED_HOSTNAMES: "" }),
      };
      await expect(
        service(values).verify("token", "account_login")
      ).rejects.toMatchObject({ response: { code: "TURNSTILE_UNAVAILABLE" } });
    }
  );
  it("allows unconfigured environments and rejects production dummy keys", async () => {
    const disabled = service({
      ...settings,
      TURNSTILE_SECRET_KEY: "",
      TURNSTILE_SITE_KEY: "",
      TURNSTILE_ALLOWED_HOSTNAMES: "",
    });
    expect(disabled.publicOptions().turnstileRequired).toBe(false);
    await expect(
      disabled.verify(undefined, "account_login")
    ).resolves.toBeUndefined();
    await expect(
      service({
        ...settings,
        NODE_ENV: "production",
        TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      }).verify("token", "account_login")
    ).rejects.toMatchObject({ response: { code: "TURNSTILE_UNAVAILABLE" } });
  });
  it.each([
    new Response("private upstream details", { status: 503 }),
    new Response("invalid JSON"),
  ])(
    "fails closed on upstream errors without leaking private details",
    async (response) => {
      jest.spyOn(global, "fetch").mockResolvedValue(response);
      await expect(
        service().verify("token", "account_login")
      ).rejects.toMatchObject({ response: { code: "TURNSTILE_UNAVAILABLE" } });
    }
  );
  it("fails closed when Cloudflare times out", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValue(new Error("private network error"));
    await expect(
      service().verify("token", "account_login")
    ).rejects.toMatchObject({ response: { code: "TURNSTILE_UNAVAILABLE" } });
  });
});
