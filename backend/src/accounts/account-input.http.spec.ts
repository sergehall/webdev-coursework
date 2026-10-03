import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request = require("supertest");

import { configureValidation } from "../bootstrap/configure-validation";
import { AnalyticsService } from "../analytics/analytics.service";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { OwnerController } from "./owner.controller";

describe("account input validation over HTTP", () => {
  let app: INestApplication;
  const register = jest.fn();
  const login = jest.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController, OwnerController],
      providers: [
        { provide: AccountService, useValue: { register } },
        { provide: AnalyticsService, useValue: { login } },
      ],
    }).compile();
    app = module.createNestApplication();
    configureValidation(app);
    await app.init();
  });
  beforeEach(() => {
    register.mockClear();
    login.mockClear();
  });
  afterAll(async () => app?.close());

  it.each([
    {
      username: "x' OR 1=1 --",
      email: "student@example.test",
      password: "long-password-123",
    },
    {
      username: "student",
      email: "<script>@example.test",
      password: "long-password-123",
    },
    { username: "student", email: "student@example.test", password: "short" },
    {
      username: "student",
      email: "student@example.test",
      password: "long-password-123",
      role: "admin",
    },
  ])("rejects invalid sign-up data before persistence", async (body) => {
    await request(app.getHttpServer())
      .post("/api/account/register")
      .send(body)
      .expect(400);
    expect(register).not.toHaveBeenCalled();
  });

  it.each([
    { identity: { $ne: null }, password: "long-password-123" },
    { identity: "student", password: "short" },
    { identity: "student", password: "long-password-123", role: "admin" },
  ])("rejects invalid sign-in data before credential lookup", async (body) => {
    const response = await request(app.getHttpServer())
      .post("/api/account/login")
      .send(body)
      .expect(400);
    expect(response.headers["set-cookie"]).toBeUndefined();
    expect(login).not.toHaveBeenCalled();
  });
});
