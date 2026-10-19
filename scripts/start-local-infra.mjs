import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

if (!existsSync(resolve(projectRoot, "backend/.env.local"))) {
  console.error(
    "Local database configuration is missing. Run `yarn workspace backend owner:configure:local` first."
  );
  process.exit(1);
}

function dockerEngineReady() {
  return (
    spawnSync("docker", ["info", "--format", "{{.ServerVersion}}"], {
      cwd: projectRoot,
      stdio: "ignore",
    }).status === 0
  );
}

if (!dockerEngineReady()) {
  if (process.platform !== "darwin") {
    console.error("Docker Engine is unavailable. Start Docker and retry.");
    process.exit(1);
  }

  const deadline = Date.now() + 90_000;
  const desktop = spawnSync("docker", ["desktop", "start", "--timeout", "90"], {
    cwd: projectRoot,
    stdio: "inherit",
  });
  if (desktop.status !== 0) {
    process.exit(desktop.status ?? 1);
  }

  while (!dockerEngineReady() && Date.now() < deadline) {
    await setTimeout(2_000);
  }
  if (!dockerEngineReady()) {
    console.error("Docker Engine did not become ready. Check Docker Desktop.");
    process.exit(1);
  }
}

const postgres = spawnSync(
  "docker",
  [
    "compose",
    "--env-file",
    "backend/.env.local",
    "-f",
    "compose.local.yml",
    "up",
    "-d",
    "--wait",
    "postgres",
  ],
  { cwd: projectRoot, stdio: "inherit" }
);

process.exit(postgres.status ?? 1);
