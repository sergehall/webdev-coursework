import { ConfigService } from "@nestjs/config";
import type { DataSource, EntityManager } from "typeorm";
import { AuthMailService, mailFailure, renderAuthMail } from "./auth-mail";
import type { AuthMailPurpose } from "./mail/auth-mail.contract";
describe("Auth mail security", () => {
  it("authenticates encrypted tokens and rejects tampering", () => {
    const mail = new AuthMailService(
      new ConfigService({ OWNER_SESSION_SECRET: "private-test-key".repeat(4) }),
      {} as DataSource
    );
    const token = "sensitive-verification-token",
      encrypted = mail.encrypt(token);
    expect(encrypted).not.toContain(token);
    expect(mail.decrypt(encrypted)).toBe(token);
    const parts = encrypted.split(".");
    parts[2] = Buffer.alloc(16).toString("base64url");
    expect(() => mail.decrypt(parts.join("."))).toThrow();
  });
  it("escapes untrusted names and renders HTML plus text", () => {
    const result = renderAuthMail(
      "verify",
      "<script>bad</script>",
      "https://webdev-coursework.com/account/verify-email#token=example"
    );
    expect(result.html).not.toContain("<script>");
    expect(result.text).toContain("#token=example");
    expect(result.html).toContain("&lt;script&gt;");
  });
  it("classifies provider failures without recording provider responses", () => {
    expect(mailFailure({ responseCode: 550 })).toBe("permanent");
    expect(mailFailure({ responseCode: 421 })).toBe("transient");
    expect(mailFailure(new Error("timeout"))).toBe("transient");
  });
});

describe("Auth mail outbox rendering", () => {
  const purposes: AuthMailPurpose[] = ["verify", "reset", "add-email"];
  function worker(purpose: AuthMailPurpose) {
    const query = jest.fn();
    const service = new AuthMailService(
      new ConfigService({
        OWNER_SESSION_SECRET: "private-test-key".repeat(4),
        OWNER_ALLOWED_ORIGINS:
          "https://webdev-coursework.com,https://other.example.test",
      }),
      { query } as unknown as DataSource
    );
    const provider = { send: jest.fn().mockResolvedValue(undefined) };
    Object.assign(service, { provider });
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const row = {
      id: "mail-1",
      account_id: "account-1",
      template: purpose,
      token_ciphertext: service.encrypt("preview-only"),
      expires_at: expiresAt.toISOString(),
      attempts: 1,
      recipient: purpose === "add-email" ? "recovery@example.test" : null,
    };
    query
      .mockResolvedValueOnce([row])
      .mockResolvedValueOnce([
        {
          email: "student@example.test",
          display_name: "Student",
          revision: "current",
        },
      ])
      .mockResolvedValueOnce([{ token_hash: "test-hash" }])
      .mockResolvedValue([]);
    return { service, provider, query, row, expiresAt };
  }

  it.each(purposes)(
    "delivers the %s template through the existing token and outbox flow",
    async (purpose) => {
      const { service, provider, query, row, expiresAt } = worker(purpose);
      await service.deliverOne();
      const path = purpose === "reset" ? "reset-password" : "verify-email";
      const content = renderAuthMail(
        purpose,
        "Student",
        `https://webdev-coursework.com/account/${path}#token=preview-only`,
        expiresAt
      );
      expect(provider.send).toHaveBeenCalledWith({
        id: row.id,
        recipient: row.recipient ?? "student@example.test",
        ...content,
      });
      expect(query.mock.calls[3][0]).toContain("status='sent'");
      expect(query.mock.calls[3][0]).toContain("token_ciphertext=NULL");
      expect(query.mock.calls[3][1]).toEqual([row.id, 1]);
    }
  );

  it("retains encrypted intent on a transient send failure", async () => {
    const { service, provider, query } = worker("verify");
    provider.send.mockRejectedValueOnce({ responseCode: 421 });
    await service.deliverOne();
    expect(query.mock.calls[3][1]).toEqual([
      "pending",
      "transient",
      30,
      false,
      "mail-1",
      1,
    ]);
  });

  it("does not render or send an expired outbox token", async () => {
    const { service, provider, query, row } = worker("verify");
    row.expires_at = new Date(Date.now() - 1000).toISOString();
    await service.deliverOne();
    expect(provider.send).not.toHaveBeenCalled();
    expect(query.mock.calls[1][0]).toContain("failure_kind='expired'");
    expect(query.mock.calls[1][0]).toContain("token_ciphertext=NULL");
  });

  it.each<[AuthMailPurpose, number]>([
    ["verify", 86400],
    ["reset", 3600],
    ["add-email", 86400],
  ])(
    "persists the %s lifetime and encrypted intent in the caller's transaction",
    async (purpose, seconds) => {
      const { service } = worker(purpose);
      const query = jest.fn().mockResolvedValue([]);
      const now = 1791273600000;
      jest.spyOn(Date, "now").mockReturnValue(now);
      await service.enqueue(
        { query } as unknown as EntityManager,
        "account-1",
        "current",
        purpose,
        "recipient@example.test"
      );
      expect(query).toHaveBeenCalledTimes(2);
      const tokenParams = query.mock.calls[0][1];
      const outboxParams = query.mock.calls[1][1];
      expect(tokenParams[2]).toBe(purpose);
      expect(outboxParams[2]).toBe(purpose);
      expect(tokenParams[3].getTime()).toBe(now + seconds * 1000);
      expect(outboxParams[4]).toEqual(tokenParams[3]);
      expect(tokenParams[5]).toBe("recipient@example.test");
      expect(outboxParams[5]).toBe("recipient@example.test");
      const plaintext = service.decrypt(outboxParams[3]);
      expect(outboxParams[3]).not.toContain(plaintext);
      expect(tokenParams[0]).not.toBe(plaintext);
    }
  );
});
