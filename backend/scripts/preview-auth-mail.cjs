#!/usr/bin/env node

// Render preview-only data. This command never reads SMTP configuration or sends mail.
require("ts-node/register");
const { mkdirSync, writeFileSync } = require("node:fs");
const { resolve, join } = require("node:path");
const { tmpdir } = require("node:os");
const {
  renderAuthMail,
} = require("../src/accounts/mail/templates/auth-mail.templates");

const directory = resolve(
  process.argv[2] ?? join(tmpdir(), "webdev-auth-mail-preview")
);
mkdirSync(directory, { recursive: true });
for (const purpose of ["verify", "reset", "add-email"]) {
  const path = purpose === "reset" ? "reset-password" : "verify-email";
  const content = renderAuthMail(
    purpose,
    "Alex",
    `https://portfolio.example.test/account/${path}#token=preview-only`
  );
  writeFileSync(join(directory, `${purpose}.html`), content.html);
  writeFileSync(
    join(directory, `${purpose}.txt`),
    `${content.subject}\n\n${content.text}\n`
  );
}
console.log(`Account email previews saved to ${directory}`);
