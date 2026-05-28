import { execFileSync } from "node:child_process";

const DEFAULT_PORTS = ["3000"];
const ports = process.argv.slice(2).length
  ? process.argv.slice(2)
  : DEFAULT_PORTS;

const uniquePorts = [...new Set(ports)].filter((port) => /^\d+$/.test(port));

if (uniquePorts.length === 0) {
  console.error("Usage: node scripts/stop-port.mjs <port> [port...]");
  process.exit(1);
}

function getListeningPids(port) {
  try {
    const output = execFileSync("lsof", [`-tiTCP:${port}`, "-sTCP:LISTEN"], {
      encoding: "utf8",
    });

    return output
      .split("\n")
      .map((pid) => pid.trim())
      .filter(Boolean);
  } catch (error) {
    if (error.status === 1) {
      return [];
    }

    throw error;
  }
}

function killPid(pid, signal) {
  try {
    execFileSync("kill", [`-${signal}`, pid], { stdio: "ignore" });
  } catch (error) {
    if (error.status === 1) {
      return;
    }

    throw error;
  }
}

for (const port of uniquePorts) {
  const pids = getListeningPids(port);

  if (pids.length === 0) {
    console.log(`Port ${port} is already free.`);
    continue;
  }

  console.log(`Stopping port ${port}: ${pids.join(", ")}`);

  for (const pid of pids) {
    killPid(pid, "TERM");
  }
}
