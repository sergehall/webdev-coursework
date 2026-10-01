const { randomBytes, scryptSync } = require("node:crypto");
// Read from stdin to keep passwords out of shell arguments and history.
let password = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  password += chunk;
});
process.stdin.on("end", () => {
  password = password.replace(/\r?\n$/, "");
  if (password.length < 12 || password.length > 128) {
    process.stderr.write("Password must have 12–128 characters.\n");
    process.exitCode = 1;
    return;
  }
  const salt = randomBytes(16).toString("hex");
  process.stdout.write(
    `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}\n`
  );
});
