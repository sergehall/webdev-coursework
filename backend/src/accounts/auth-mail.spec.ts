import { ConfigService } from "@nestjs/config";
import type { DataSource } from "typeorm";
import { AuthMailService, mailFailure, renderAuthMail } from "./auth-mail";
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
