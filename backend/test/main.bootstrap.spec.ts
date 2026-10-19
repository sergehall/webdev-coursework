import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import * as createAppModule from "../src/create-app";
import { bootstrap } from "../src/main";

type AppBootstrapMock = Pick<
  NestExpressApplication,
  "enableShutdownHooks" | "listen" | "getUrl"
>;

describe("bootstrap", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.PORT;
  });

  it("starts backend with default port when PORT is not set", async () => {
    const listen = jest.fn().mockResolvedValue({
      address: () => ({ address: "::", port: 5050 }),
    });
    const appMock: AppBootstrapMock = {
      enableShutdownHooks: jest.fn(),
      listen,
      getUrl: jest.fn().mockResolvedValue("http://localhost:5050"),
    };

    const createSpy = jest
      .spyOn(NestFactory, "create")
      .mockResolvedValue(appMock as NestExpressApplication);
    const createAppSpy = jest
      .spyOn(createAppModule, "createApp")
      .mockImplementation(() => appMock as NestExpressApplication);
    const logSpy = jest
      .spyOn(Logger.prototype, "log")
      .mockImplementation(() => {});

    await bootstrap();

    expect(createSpy).toHaveBeenCalledWith(AppModule, { rawBody: true });
    expect(createAppSpy).toHaveBeenCalledWith(appMock);
    expect(appMock.enableShutdownHooks).toHaveBeenCalledTimes(1);
    expect(appMock.listen).toHaveBeenCalledWith(5050);
    expect(appMock.getUrl).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      "Backend listening | host: :: | port: 5050 | URL: http://localhost:5050"
    );
  });

  it("uses PORT from environment when provided", async () => {
    process.env.PORT = "6061";

    const listen = jest.fn().mockResolvedValue({
      address: () => ({ address: "127.0.0.1", port: 6061 }),
    });
    const appMock: AppBootstrapMock = {
      enableShutdownHooks: jest.fn(),
      listen,
      getUrl: jest.fn().mockResolvedValue("http://localhost:6061"),
    };

    jest
      .spyOn(NestFactory, "create")
      .mockResolvedValue(appMock as NestExpressApplication);
    jest
      .spyOn(createAppModule, "createApp")
      .mockImplementation(() => appMock as NestExpressApplication);
    const logSpy = jest
      .spyOn(Logger.prototype, "log")
      .mockImplementation(() => {});

    await bootstrap();

    expect(appMock.enableShutdownHooks).toHaveBeenCalledTimes(1);
    expect(appMock.listen).toHaveBeenCalledWith(6061);
    expect(appMock.getUrl).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      "Backend listening | host: 127.0.0.1 | port: 6061 | URL: http://localhost:6061"
    );
  });
});
