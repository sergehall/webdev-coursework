const fs = require("node:fs");
const { resolve } = require("node:path");
const { parseEnv } = require("node:util");
const { randomBytes, scryptSync } = require("node:crypto");
const { spawnSync } = require("node:child_process");
(async () => {
  try {
    const path = resolve(__dirname, "../.env.production.local");
    const values = parseEnv(fs.readFileSync(path, "utf8"));
    if (!values.OWNER_SESSION_SECRET)
      values.OWNER_SESSION_SECRET = randomBytes(48).toString("base64url");
    if (!values.OWNER_PASSWORD_HASH) {
      const password = randomBytes(24).toString("base64url"),
        salt = randomBytes(16);
      values.OWNER_PROD_INITIAL_PASSWORD = password;
      values.OWNER_PASSWORD_HASH = `scrypt:${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`;
    }
    values.OWNER_ALLOWED_ORIGINS =
      "https://webdev-coursework.com,https://www.webdev-coursework.com";
    values.QR_ANALYTICS_ENABLED = process.argv.includes("--enable")
      ? "true"
      : "false";
    fs.writeFileSync(
      path,
      Object.entries(values)
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join("\n") + "\n",
      { mode: 0o600 }
    );
    fs.chmodSync(path, 0o600);
    const auth = spawnSync("/opt/homebrew/bin/heroku", ["auth:token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (auth.status !== 0) throw new Error();
    const headers = {
      Authorization: `Bearer ${auth.stdout.trim()}`,
      Accept: "application/vnd.heroku+json; version=3",
      "Content-Type": "application/json",
    };
    const url =
      "https://api.heroku.com/apps/fd290d91-be8b-4ede-a0af-58a12a4b8225/config-vars";
    const old = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(15000),
    });
    if (!old.ok) throw new Error();
    const prior = await old.json();
    const payload = Object.fromEntries(
      [
        "OWNER_SESSION_SECRET",
        "OWNER_PASSWORD_HASH",
        "OWNER_ALLOWED_ORIGINS",
        "QR_ANALYTICS_ENABLED",
      ].map((k) => [k, values[k]])
    );
    payload.ALLOWED_ORIGINS = [
      ...new Set([
        ...(prior.ALLOWED_ORIGINS || "").split(",").filter(Boolean),
        "https://webdev-coursework.com",
        "https://www.webdev-coursework.com",
      ]),
    ].join(",");
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error();
    const actual = await response.json();
    if (!Object.entries(payload).every(([k, v]) => actual[k] === v))
      throw new Error();
    console.log(
      `Production account settings verified; feature ${values.QR_ANALYTICS_ENABLED === "true" ? "enabled" : "disabled until migrations complete"}. Database configuration unchanged.`
    );
  } catch {
    console.error("Production configuration failed; secret values suppressed.");
    process.exitCode = 1;
  }
})();
