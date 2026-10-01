const { resolve } = require("node:path");
process.loadEnvFile(resolve(__dirname, "../.env.local"));
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_USE_SSL === "true",
  requireTLS: process.env.SMTP_USE_SSL !== "true",
  auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  tls: { rejectUnauthorized: true },
});
transport
  .verify()
  .then(() =>
    console.log("SMTP authentication and TLS verified; no email sent.")
  )
  .catch(() => {
    console.error("SMTP authentication failed; credential values suppressed.");
    process.exitCode = 1;
  })
  .finally(() => transport.close());
