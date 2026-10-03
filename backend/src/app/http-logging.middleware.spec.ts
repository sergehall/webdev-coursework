import { EventEmitter } from "events";
import { Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { HttpLoggingMiddleware } from "./http-logging.middleware";

describe("HTTP logging", () => {
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
