// Explicitly copies SMTP settings only. Never copies database URLs or app data.
const fs = require("node:fs");
const { parseEnv } = require("node:util");
const { spawnSync } = require("node:child_process");
(async () => {
  try {
    const values = parseEnv(
      fs.readFileSync(
        require("node:path").resolve(__dirname, "../.env.production.local"),
        "utf8"
      )
    );
    const keys = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USERNAME",
      "SMTP_PASSWORD",
      "SMTP_FROM_EMAIL",
      "SMTP_FROM_NAME",
      "SMTP_REQUIRE_TLS",
      "SMTP_USE_SSL",
    ];
    const payload = Object.fromEntries(
      keys.filter((k) => values[k] !== undefined).map((k) => [k, values[k]])
    );
    if (!payload.SMTP_HOST || !payload.SMTP_PASSWORD)
      throw new Error("Missing SMTP configuration");
    const auth = spawnSync("/opt/homebrew/bin/heroku", ["auth:token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (auth.status !== 0) throw new Error("Heroku authentication unavailable");
    const response = await fetch(
      "https://api.heroku.com/apps/fd290d91-be8b-4ede-a0af-58a12a4b8225/config-vars",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.stdout.trim()}`,
          Accept: "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      }
    );
    if (!response.ok) throw new Error("Configuration update failed");
    const actual = await response.json();
    if (
      !keys
        .filter((k) => payload[k] !== undefined)
        .every((k) => actual[k] === payload[k])
    )
      throw new Error("Configuration verification failed");
    console.log(
      "Production SMTP settings synchronized and verified. No database settings changed."
    );
  } catch {
    console.error("SMTP synchronization failed. Secret values suppressed.");
    process.exitCode = 1;
  }
})();
