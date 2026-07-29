import { Logger } from "@nestjs/common";
import type { DataSource } from "typeorm";

import { CircuitBreakerService } from "../../src/app/circuit-breaker.service";

type DataSourceProbe = jest.Mocked<Pick<DataSource, "query">>;

describe("CircuitBreakerService", () => {
  let dataSource: DataSourceProbe;
  let originalFailureThreshold: string | undefined;
  let originalRecoveryTimeout: string | undefined;

  beforeEach(() => {
    originalFailureThreshold = process.env.CB_FAILURE_THRESHOLD;
    originalRecoveryTimeout = process.env.CB_RECOVERY_TIMEOUT_MS;
    process.env.CB_FAILURE_THRESHOLD = "2";
    process.env.CB_RECOVERY_TIMEOUT_MS = "1000";

    dataSource = {
      query: jest.fn(),
    };

    jest.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-07-28T12:00:00.000Z"));
  });

  afterEach(() => {
    if (originalFailureThreshold === undefined) {
      delete process.env.CB_FAILURE_THRESHOLD;
    } else {
      process.env.CB_FAILURE_THRESHOLD = originalFailureThreshold;
    }

    if (originalRecoveryTimeout === undefined) {
      delete process.env.CB_RECOVERY_TIMEOUT_MS;
    } else {
      process.env.CB_RECOVERY_TIMEOUT_MS = originalRecoveryTimeout;
    }

    jest.useRealTimers();
  });

  it("should remain closed when the database probe succeeds", async () => {
    dataSource.query.mockResolvedValue([]);
    const service = createService(dataSource);

    await expect(service.probe()).resolves.toBe(true);

    expect(service.getState()).toBe("CLOSED");
    expect(dataSource.query).toHaveBeenCalledWith("SELECT 1");
  });

  it("should open after the configured failure threshold and fail fast", async () => {
    dataSource.query.mockRejectedValue(new Error("database unavailable"));
    const service = createService(dataSource);

    await expect(service.probe()).resolves.toBe(false);
    expect(service.getState()).toBe("CLOSED");

    await expect(service.probe()).resolves.toBe(false);
    expect(service.getState()).toBe("OPEN");

    await expect(service.probe()).resolves.toBe(false);
    expect(dataSource.query).toHaveBeenCalledTimes(2);
  });

  it("should close after a successful half-open recovery probe", async () => {
    dataSource.query
      .mockRejectedValueOnce(new Error("first failure"))
      .mockRejectedValueOnce(new Error("second failure"))
      .mockResolvedValueOnce([]);
    const service = createService(dataSource);

    await service.probe();
    await service.probe();
    expect(service.getState()).toBe("OPEN");

    jest.advanceTimersByTime(1001);

    await expect(service.probe()).resolves.toBe(true);
    expect(service.getState()).toBe("CLOSED");
    expect(dataSource.query).toHaveBeenCalledTimes(3);
  });

  it("should reopen when the half-open recovery probe fails", async () => {
    process.env.CB_FAILURE_THRESHOLD = "1";
    dataSource.query.mockRejectedValue(new Error("still unavailable"));
    const service = createService(dataSource);

    await service.probe();
    expect(service.getState()).toBe("OPEN");

    jest.advanceTimersByTime(1001);

    await expect(service.probe()).resolves.toBe(false);
    expect(service.getState()).toBe("OPEN");
    expect(dataSource.query).toHaveBeenCalledTimes(2);
  });

  it("should reset consecutive failures after a successful probe", async () => {
    dataSource.query
      .mockRejectedValueOnce(new Error("transient failure"))
      .mockResolvedValueOnce([])
      .mockRejectedValueOnce(new Error("another transient failure"));
    const service = createService(dataSource);

    await expect(service.probe()).resolves.toBe(false);
    await expect(service.probe()).resolves.toBe(true);
    await expect(service.probe()).resolves.toBe(false);

    expect(service.getState()).toBe("CLOSED");
  });
});

function createService(dataSource: DataSourceProbe): CircuitBreakerService {
  return new CircuitBreakerService(dataSource as unknown as DataSource);
}
