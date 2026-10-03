import { BadRequestException } from "@nestjs/common";
import { dictionary } from "@zxcvbn-ts/language-common";

// Check the whole candidate against a local blocklist. Never send passwords to a third party.
const commonPasswords = new Set(
  dictionary["passwords-common"].map((value) => value.toLowerCase())
);
const serviceNames = ["webdev-coursework", "webdev-coursework.com"];

export function assertAcceptablePassword(
  password: string,
  identifiers: readonly string[] = []
): void {
  const candidate = password.toLowerCase();
  const expected = [...serviceNames, ...identifiers].some(
    (identifier) =>
      identifier.length > 0 && candidate === identifier.toLowerCase()
  );
  if (commonPasswords.has(candidate) || expected) {
    throw new BadRequestException({
      code: "PASSWORD_TOO_COMMON",
      message: "Choose a less common password.",
    });
  }
}
