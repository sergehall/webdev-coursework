import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const deriveKey = promisify(scrypt);
export const OWNER_HASH_PATTERN = /^scrypt:([a-f0-9]{32}):([a-f0-9]{128})$/;

export async function verifyOwnerPassword(
  password: string,
  encoded: string
): Promise<boolean> {
  const match = OWNER_HASH_PATTERN.exec(encoded);
  if (!match) return false;
  const actual = (await deriveKey(
    password,
    Buffer.from(match[1], "hex"),
    64
  )) as Buffer;
  return timingSafeEqual(actual, Buffer.from(match[2], "hex"));
}

export async function hashOwnerPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = (await deriveKey(password, salt, 64)) as Buffer;
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}
