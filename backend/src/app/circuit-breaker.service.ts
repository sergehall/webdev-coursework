// src/app/circuit-breaker.service.ts
//
// Minimal circuit breaker that wraps the TypeORM connection.
// States: CLOSED (normal) → OPEN (failing fast) → HALF_OPEN (probing)
//
// Configuration via env vars:
//   CB_FAILURE_THRESHOLD   – consecutive failures before opening  (default: 5)
//   CB_RECOVERY_TIMEOUT_MS – ms to wait before probing again      (default: 30000)

import { Injectable, Logger } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

type State = "CLOSED" | "OPEN" | "HALF_OPEN";

function parseIntEnv(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isNaN(n) || n < 1 ? fallback : n;
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
  private state: State = "CLOSED";
  private failures = 0;
  private openedAt: number | null = null;

  private readonly failureThreshold: number;
  private readonly recoveryTimeoutMs: number;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.failureThreshold = parseIntEnv(process.env.CB_FAILURE_THRESHOLD, 5);
    this.recoveryTimeoutMs = parseIntEnv(
      process.env.CB_RECOVERY_TIMEOUT_MS,
      30_000
    );
  }

  /** Returns the current circuit state. */
  getState(): State {
    return this.state;
  }

  /**
   * Run a lightweight DB probe and update circuit state accordingly.
   * Returns true if the DB is reachable, false otherwise.
   */
  async probe(): Promise<boolean> {
    if (this.state === "OPEN") {
      const elapsed = Date.now() - (this.openedAt ?? 0);
      if (elapsed < this.recoveryTimeoutMs) {
        // Still within the recovery window — fail fast without querying.
        return false;
      }
      this.state = "HALF_OPEN";
      this.logger.log("Circuit HALF_OPEN — probing DB");
    }

    try {
      await this.dataSource.query("SELECT 1");
      this.onSuccess();
      return true;
    } catch (err) {
      this.onFailure(err);
      return false;
    }
  }

  private onSuccess(): void {
    if (this.state !== "CLOSED") {
      this.logger.log("Circuit CLOSED — DB is reachable again");
    }
    this.state = "CLOSED";
    this.failures = 0;
    this.openedAt = null;
  }

  private onFailure(err: unknown): void {
    this.failures += 1;
    const msg = err instanceof Error ? err.message : String(err);

    if (this.failures >= this.failureThreshold || this.state === "HALF_OPEN") {
      this.state = "OPEN";
      this.openedAt = Date.now();
      this.logger.error(
        `Circuit OPEN after ${this.failures} failure(s). Will probe again in ${this.recoveryTimeoutMs} ms. Last error: ${msg}`
      );
    } else {
      this.logger.warn(
        `DB probe failed (${this.failures}/${this.failureThreshold}): ${msg}`
      );
    }
  }
}
