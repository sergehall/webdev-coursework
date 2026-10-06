import { EventEmitter } from "events";
import { Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { HttpLoggingMiddleware } from "./http-logging.middleware";

describe("HTTP logging", () => {
  it("logs mentor route templates without IDs, query values or client metadata", () => {
    const log = jest.spyOn(Logger.prototype, "log").mockImplementation();
    try {
      const response = new EventEmitter() as Response;
      response.statusCode = 200;
      const request = {
        method: "GET",
        originalUrl:
          "/api/mentor/conversations/private-id/messages?token=private-token",
        ip: "private-ip",
        get: jest.fn().mockReturnValue("private-agent"),
      } as unknown as Request;
      new HttpLoggingMiddleware().use(request, response, jest.fn());
      request.route = { path: "/api/mentor/conversations/:id/messages" };
      response.emit("finish");
      expect(log).toHaveBeenCalledWith(
        expect.stringMatching(
          /^GET \/api\/mentor\/conversations\/:id\/messages 200 \d+ms$/
        )
      );
      expect(JSON.stringify(log.mock.calls)).not.toMatch(
        /private-id|private-token|private-ip|private-agent/
      );
    } finally {
      log.mockRestore();
    }
  });

  it("records a disconnected mentor stream without a private URL", () => {
    const warn = jest.spyOn(Logger.prototype, "warn").mockImplementation();
    try {
      const response = new EventEmitter() as Response;
      const request = {
        method: "POST",
        originalUrl: "/api/mentor/conversations/private-id/messages",
      } as Request;
      new HttpLoggingMiddleware().use(request, response, jest.fn());
      request.route = { path: "/api/mentor/conversations/:id/messages" };
      response.emit("close");
      expect(warn).toHaveBeenCalledWith(
        expect.stringMatching(
          /^POST \/api\/mentor\/conversations\/:id\/messages aborted \d+ms$/
        )
      );
      expect(JSON.stringify(warn.mock.calls)).not.toContain("private-id");
    } finally {
      warn.mockRestore();
    }
  });

  it("does not log anonymous client IDs from quiz progress URLs", () => {
    const log = jest.spyOn(Logger.prototype, "log").mockImplementation();
    try {
      const response = new EventEmitter() as Response;
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.getHeader = jest.fn().mockReturnValue(undefined);
      const request = {
        method: "GET",
        originalUrl:
          "/quizzes/progress?clientId=private-client-id&courseId=CS80",
        ip: "127.0.0.1",
        get: jest.fn().mockReturnValue("test-agent"),
      } as unknown as Request;
      const next = jest.fn() as NextFunction;

      new HttpLoggingMiddleware().use(request, response, next);
      response.emit("finish");

      expect(next).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining("GET /quizzes/progress 200")
      );
      expect(log.mock.calls[0][0]).not.toContain("private-client-id");
    } finally {
      log.mockRestore();
    }
  });
});
