import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function base32(bytes: Buffer): string {
  let bits = 0,
    value = 0,
    output = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits) output += alphabet[(value << (5 - bits)) & 31];
  return output;
}
function decode(value: string): Buffer {
  let bits = 0,
    accumulator = 0;
  const bytes: number[] = [];
  for (const char of value) {
    const index = alphabet.indexOf(char);
    if (index < 0) throw new Error("Invalid authenticator secret");
    accumulator = (accumulator << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bytes.push((accumulator >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}
// Adapted from Lens Lounge's TOTP service; compatible with RFC 6238 SHA-1.
export function totp(secret: string, step: number, digits = 6): string {
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const digest = createHmac("sha1", decode(secret)).update(counter).digest();
  const offset = digest[digest.length - 1] & 15;
  return ((digest.readUInt32BE(offset) & 0x7fffffff) % 10 ** digits)
    .toString()
    .padStart(digits, "0");
}
@Injectable()
export class MfaCrypto {
  private readonly keys = new Map<string, Buffer>();
  private readonly keyId: string;
  constructor(config: ConfigService) {
    this.keyId = config.get<string>("MFA_ENCRYPTION_KEY_ID") ?? "v1";
    for (const [id, encoded] of [
      [this.keyId, config.get<string>("MFA_ENCRYPTION_KEY")],
      [
        config.get<string>("MFA_PREVIOUS_ENCRYPTION_KEY_ID"),
        config.get<string>("MFA_PREVIOUS_ENCRYPTION_KEY"),
      ],
    ]) {
      if (!encoded) continue;
      const key = Buffer.from(encoded, "base64");
      if (
        !id ||
        !/^[a-zA-Z0-9_-]{1,32}$/.test(id) ||
        key.length !== 32 ||
        key.toString("base64") !== encoded ||
        this.keys.has(id)
      )
        throw new Error("Invalid dedicated MFA encryption configuration");
      this.keys.set(id, key);
    }
  }
  get available(): boolean {
    return this.keys.has(this.keyId);
  }
  enrollment(accountId: string, username: string) {
    const secret = base32(randomBytes(20));
    const issuer = "Web Engineering Portfolio";
    return {
      secret,
      issuer,
      accountName: username,
      otpauthUri: `otpauth://totp/${encodeURIComponent(`${issuer}:${username}`)}?${new URLSearchParams({ secret, issuer, algorithm: "SHA1", digits: "6", period: "30" })}`,
      encrypted: this.encrypt(secret, accountId),
    };
  }
  encrypt(secret: string, accountId: string): string {
    const key = this.keys.get(this.keyId);
    if (!key)
      throw new ServiceUnavailableException(
        "Authenticator setup is not configured"
      );
    const iv = randomBytes(12),
      cipher = createCipheriv("aes-256-gcm", key, iv);
    cipher.setAAD(Buffer.from(`webdev-mfa:${accountId}:v1:${this.keyId}`));
    const ciphertext = Buffer.concat([
      cipher.update(secret, "utf8"),
      cipher.final(),
    ]);
    return [
      "v1",
      this.keyId,
      iv.toString("base64url"),
      cipher.getAuthTag().toString("base64url"),
      ciphertext.toString("base64url"),
    ].join(".");
  }
  decrypt(envelope: string, accountId: string): string {
    const [version, id, iv, tag, ciphertext, extra] = envelope.split(".");
    const key = this.keys.get(id);
    if (!key)
      throw new ServiceUnavailableException(
        "Authenticator verification is temporarily unavailable"
      );
    if (
      version !== "v1" ||
      extra ||
      !ciphertext ||
      Buffer.from(iv, "base64url").length !== 12 ||
      Buffer.from(tag, "base64url").length !== 16
    )
      throw new Error("Invalid encrypted authenticator secret");
    const cipher = createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(iv, "base64url")
    );
    cipher.setAAD(Buffer.from(`webdev-mfa:${accountId}:v1:${id}`));
    cipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([
      cipher.update(Buffer.from(ciphertext, "base64url")),
      cipher.final(),
    ]).toString("utf8");
  }
  matchStep(
    encrypted: string,
    accountId: string,
    code: string,
    lastStep: number,
    now = Date.now()
  ): number | null {
    if (!/^\d{6}$/.test(code)) return null;
    const secret = this.decrypt(encrypted, accountId),
      current = Math.floor(now / 30000);
    for (const step of [current, current - 1, current + 1]) {
      if (step <= lastStep || step < 0) continue;
      if (timingSafeEqual(Buffer.from(totp(secret, step)), Buffer.from(code)))
        return step;
    }
    return null;
  }
}
