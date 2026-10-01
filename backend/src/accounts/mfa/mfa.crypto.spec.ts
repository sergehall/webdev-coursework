import { ConfigService } from "@nestjs/config";
import { MfaCrypto, base32, totp } from "./mfa.crypto";

const key = Buffer.alloc(32, 7).toString("base64");
const crypto = () =>
  new MfaCrypto(new ConfigService({ MFA_ENCRYPTION_KEY: key }));
describe("Authenticator cryptography", () => {
  it.each([
    [59, "94287082"],
    [1111111109, "07081804"],
    [1111111111, "14050471"],
    [1234567890, "89005924"],
    [2000000000, "69279037"],
    [20000000000, "65353130"],
  ])("matches RFC 6238 SHA-1 at %s", (seconds, expected) => {
    expect(
      totp(
        base32(Buffer.from("12345678901234567890")),
        Math.floor(Number(seconds) / 30),
        8
      )
    ).toBe(expected);
  });
  it("authenticates encrypted secrets and binds them to their account", () => {
    const service = crypto(),
      setup = service.enrollment("account-a", "student");
    expect(setup.encrypted).not.toContain(setup.secret);
    expect(service.decrypt(setup.encrypted, "account-a")).toBe(setup.secret);
    expect(() => service.decrypt(setup.encrypted, "account-b")).toThrow();
    const parts = setup.encrypted.split(".");
    parts[3] = Buffer.alloc(16).toString("base64url");
    expect(() => service.decrypt(parts.join("."), "account-a")).toThrow();
  });
  it("accepts one adjacent time step and rejects replay and out-of-window codes", () => {
    const service = crypto(),
      setup = service.enrollment("a", "student"),
      now = 1234567890000,
      step = Math.floor(now / 30000);
    for (const offset of [-1, 0, 1])
      expect(
        service.matchStep(
          setup.encrypted,
          "a",
          totp(setup.secret, step + offset),
          step - 2,
          now
        )
      ).toBe(step + offset);
    expect(
      service.matchStep(
        setup.encrypted,
        "a",
        totp(setup.secret, step),
        step,
        now
      )
    ).toBeNull();
    expect(
      service.matchStep(
        setup.encrypted,
        "a",
        totp(setup.secret, step + 2),
        step - 2,
        now
      )
    ).toBeNull();
    expect(
      service.matchStep(setup.encrypted, "a", "malformed", -1, now)
    ).toBeNull();
  });
  it("supports dedicated-key rotation without a JWT-secret fallback", () => {
    const old = crypto().enrollment("a", "student");
    const rotated = new MfaCrypto(
      new ConfigService({
        MFA_ENCRYPTION_KEY: Buffer.alloc(32, 8).toString("base64"),
        MFA_ENCRYPTION_KEY_ID: "v2",
        MFA_PREVIOUS_ENCRYPTION_KEY: key,
        MFA_PREVIOUS_ENCRYPTION_KEY_ID: "v1",
      })
    );
    expect(rotated.decrypt(old.encrypted, "a")).toBe(old.secret);
    expect(rotated.encrypt(old.secret, "a")).toMatch(/^v1\.v2\./);
    const unconfigured = new MfaCrypto(
      new ConfigService({ OWNER_SESSION_SECRET: key })
    );
    expect(unconfigured.available).toBe(false);
    expect(() => unconfigured.enrollment("a", "student")).toThrow(
      "not configured"
    );
    expect(
      () => new MfaCrypto(new ConfigService({ MFA_ENCRYPTION_KEY: "bad" }))
    ).toThrow("Invalid dedicated MFA encryption configuration");
  });
});
