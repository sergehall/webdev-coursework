const {
  readFileSync,
  writeFileSync,
  existsSync,
  chmodSync,
} = require("node:fs");
const { randomBytes, scryptSync } = require("node:crypto");
const { resolve } = require("node:path");
// The local runtime uses the same PostgreSQL infrastructure as Heroku.
const file = resolve(__dirname, "../.env.local");
// Drop retired state-store credentials while preserving existing account/mail secrets.
const original = (existsSync(file) ? readFileSync(file, "utf8") : "").replace(
  /^(?:REDIS_URL|LOCAL_REDIS_PASSWORD)=.*\r?\n?/gm,
  ""
);
const settings = Object.fromEntries(
  original
    .split(/\r?\n/)
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1)];
    })
);
const random = () => randomBytes(32).toString("base64url");
settings.LOCAL_POSTGRES_PASSWORD ||= random();
settings.OWNER_SESSION_SECRET ||= random();
settings.MFA_ENCRYPTION_KEY ||= randomBytes(32).toString("base64");
settings.MFA_ENCRYPTION_KEY_ID ||= "v1";
if (!settings.OWNER_PASSWORD_HASH) {
  const salt = randomBytes(16).toString("hex");
  settings.OWNER_LOCAL_INITIAL_PASSWORD = random();
  settings.OWNER_PASSWORD_HASH = `scrypt:${salt}:${scryptSync(settings.OWNER_LOCAL_INITIAL_PASSWORD, salt, 64).toString("hex")}`;
}
Object.assign(settings, {
  NODE_ENV: "development",
  PORT: "5050",
  POSTGRES_SSL: "false",
  DATABASE_URL: `postgres://webdev_local:${settings.LOCAL_POSTGRES_PASSWORD}@127.0.0.1:55432/webdev_coursework_local`,
  OWNER_ALLOWED_ORIGINS: "http://127.0.0.1:3000",
  ALLOWED_ORIGINS: "http://127.0.0.1:3000",
  GITHUB_CLIENT_ID: "Ov23liKJ9hxIL0RaveDO",
  GITHUB_OWNER_ID: "60080971",
  GITHUB_CALLBACK_URL: "http://127.0.0.1:3000/api/owner/github/callback",
  QR_ANALYTICS_ENABLED: settings.GITHUB_CLIENT_SECRET ? "true" : "false",
});
let output = original;
for (const [key, value] of Object.entries(settings)) {
  const pattern = new RegExp(`^${key}=.*$`, "m");
  output = pattern.test(output)
    ? output.replace(pattern, `${key}=${value}`)
    : `${output.replace(/\s*$/, "")}\n${key}=${value}\n`;
}
if (existsSync(file)) chmodSync(file, 0o600);
writeFileSync(file, output, { mode: 0o600 });
console.log(
  "Local owner configuration saved (values hidden). OAuth enabled:",
  settings.QR_ANALYTICS_ENABLED === "true",
  "State storage:",
  "PostgreSQL"
);
