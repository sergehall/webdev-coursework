import {
  Body,
  Controller,
  Get,
  Global,
  Module,
  Post,
  type INestApplication,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { IsString } from "class-validator";
import { DataSource } from "typeorm";
import request = require("supertest");
import { SecurityModule } from "../../src/security/security.module";
import {
  RequestThrottleService,
  throttleAddress,
} from "../../src/security/request-throttle.service";
import { createApp } from "../../src/create-app";

class InputDto {
  @IsString() value!: string;
}
const executed = jest.fn();
@Controller(["api/account", "api/owner"])
class ProtectedTestController {
  @Get("session") session() {
    executed();
    return { ok: true };
  }
  @Post("login") login(@Body() body: InputDto) {
    executed();
    return body;
  }
  @Post("profile") profile() {
    executed();
    return { saved: true };
  }
}
@Controller()
class HealthTestController {
  @Get("health") health() {
    return { ok: true };
  }
}
const db = { query: jest.fn(async () => []) };
@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService({
        ALLOWED_ORIGINS: "https://trusted.example.test",
        NODE_ENV: "test",
      }),
    },
    { provide: DataSource, useValue: db },
  ],
  exports: [ConfigService, DataSource],
})
class TestDependencies {}

describe("global API abuse protection over HTTP", () => {
  const originalOrigins = process.env.ALLOWED_ORIGINS;
  let app: INestApplication;
  let consume: jest.SpyInstance;
  const counts = new Map<string, number>();
  beforeAll(async () => {
    process.env.ALLOWED_ORIGINS = "https://trusted.example.test";
    const module = await Test.createTestingModule({
      imports: [TestDependencies, SecurityModule],
      controllers: [ProtectedTestController, HealthTestController],
    }).compile();
    app = createApp(module.createNestApplication());
    await app.listen(0, "127.0.0.1");
  });
  beforeEach(() => {
    consume = jest.spyOn(app.get(RequestThrottleService), "consume");
    executed.mockClear();
    counts.clear();
    consume.mockImplementation(async (address: string, bucket: string) => {
      const key = `${address}:${bucket}`;
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      return { count, retryAfter: 42 };
    });
  });
  afterAll(async () => {
    await app.close();
    if (originalOrigins === undefined) delete process.env.ALLOWED_ORIGINS;
    else process.env.ALLOWED_ORIGINS = originalOrigins;
  });

  it("counts rejected DTOs and shares sensitive limits across aliases and forged forwarding headers", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer())
        .post(`/api/${i % 2 ? "owner" : "account"}/login`)
        .set("X-Forwarded-For", `198.51.100.${i + 1}`)
        .send({ value: 123 })
        .expect(400);
    }
    const response = await request(app.getHttpServer())
      .post("/api/account/login")
      .set("X-Forwarded-For", "203.0.113.1")
      .send({ value: "valid" })
      .expect(429);
    expect(response.headers["retry-after"]).toBe("42");
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(executed).not.toHaveBeenCalled();
  });
  it("counts malformed JSON before parsing and meters scans of unknown API paths", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer())
        .post("/api/account/login")
        .set("Content-Type", "application/json")
        .send("{")
        .expect(400);
    }
    await request(app.getHttpServer())
      .post("/api/account/login")
      .send({ value: "valid" })
      .expect(429);
    counts.clear();
    for (let i = 0; i < 20; i++)
      await request(app.getHttpServer()).get(`/api/scanner-${i}`).expect(404);
    await request(app.getHttpServer()).get("/api/scanner-next").expect(429);
    expect(executed).not.toHaveBeenCalled();
  });
  it("counts a valid request only once through middleware and the global guard", async () => {
    await request(app.getHttpServer()).get("/api/account/session").expect(200);
    expect(consume).toHaveBeenCalledTimes(2);
  });
  it("blocks bursts of reads and leaves health probes available", async () => {
    const responses = await Promise.all(
      Array.from({ length: 25 }, () =>
        request(app.getHttpServer()).get("/api/account/session")
      )
    );
    expect(
      responses.filter((response) => response.status === 200)
    ).toHaveLength(20);
    expect(
      responses.filter((response) => response.status === 429)
    ).toHaveLength(5);
    await request(app.getHttpServer()).get("/health").expect(200);
  });
  it("does not bypass the minute limit by rotating endpoints", async () => {
    consume.mockImplementation(async (_address: string, bucket: string) => ({
      count: bucket === "api" ? 121 : 1,
      retryAfter: 30,
    }));
    await request(app.getHttpServer()).get("/api/owner/session").expect(429);
    expect(executed).not.toHaveBeenCalled();
  });
  it("enforces write budgets independently of sensitive-operation budgets", async () => {
    consume.mockImplementation(async (_address: string, bucket: string) => ({
      count: bucket === "write" ? 31 : 1,
      retryAfter: 30,
    }));
    await request(app.getHttpServer()).post("/api/account/profile").expect(429);
    expect(executed).not.toHaveBeenCalled();
  });
  it("exposes rate-limit responses and Retry-After to the trusted frontend", async () => {
    consume.mockImplementation(async (_address: string, bucket: string) => ({
      count: bucket === "api" ? 121 : 1,
      retryAfter: 30,
    }));
    const response = await request(app.getHttpServer())
      .get("/api/account/session")
      .set("Origin", "https://trusted.example.test")
      .expect(429);
    expect(response.headers["access-control-allow-origin"]).toBe(
      "https://trusted.example.test"
    );
    expect(response.headers["access-control-expose-headers"]).toContain(
      "Retry-After"
    );
  });
  it("rejects untrusted browser writes, permits trusted cross-site frontend and non-browser clients", async () => {
    await request(app.getHttpServer())
      .post("/api/account/profile")
      .set("Origin", "https://evil.example")
      .expect(403);
    await request(app.getHttpServer())
      .post("/api/account/profile")
      .set("Sec-Fetch-Site", "cross-site")
      .expect(403);
    await request(app.getHttpServer())
      .post("/api/account/profile")
      .set("Origin", "https://trusted.example.test")
      .set("Sec-Fetch-Site", "cross-site")
      .expect(201);
    await request(app.getHttpServer()).post("/api/account/profile").expect(201);
  });
  it("fails closed when shared storage is unavailable", async () => {
    const { ServiceUnavailableException } = await import("@nestjs/common");
    consume.mockRejectedValue(
      new ServiceUnavailableException(
        "Request protection is temporarily unavailable"
      )
    );
    await request(app.getHttpServer()).get("/api/account/session").expect(503);
    expect(executed).not.toHaveBeenCalled();
  });
});

describe("throttle identity", () => {
  it("shares equivalent IPv4 and mapped IPv6 identities", () => {
    expect(throttleAddress("::ffff:192.0.2.42")).toBe("192.0.2.42");
    expect(throttleAddress("0:0:0:0:0:ffff:c000:22a")).toBe("192.0.2.42");
  });
  it("aggregates IPv6 privacy addresses within a /64", () => {
    expect(throttleAddress("2001:db8:1234:5678::1")).toBe(
      throttleAddress("2001:0db8:1234:5678:ffff:ffff:ffff:ffff")
    );
    expect(throttleAddress("2001:db8:1234:5679::1")).not.toBe(
      throttleAddress("2001:db8:1234:5678::1")
    );
  });
});
