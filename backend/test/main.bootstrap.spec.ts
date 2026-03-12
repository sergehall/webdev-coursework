import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import * as createAppModule from "../src/create-app";
import { bootstrap } from "../src/main";

describe("bootstrap", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.PORT;
  });

  it("starts backend with default port when PORT is not set", async () => {
    const listen = jest
      .fn()
      .mockImplementation(async (_port: number, cb?: () => void) => {
        cb?.();
      });
    const appMock = {
      listen,
      getUrl: jest.fn().mockResolvedValue("http://localhost:5050"),
    };

    const createSpy = jest
      .spyOn(NestFactory, "create")
      .mockResolvedValue(appMock as any);
    const createAppSpy = jest
      .spyOn(createAppModule, "createApp")
      .mockImplementation(() => appMock as any);
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await bootstrap();

    expect(createSpy).toHaveBeenCalledWith(AppModule, { rawBody: true });
    expect(createAppSpy).toHaveBeenCalledWith(appMock);
    expect(appMock.listen).toHaveBeenCalledWith(5050, expect.any(Function));
    expect(appMock.getUrl).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      "🚀 Backend API is running on http://localhost:5050"
    );
    expect(logSpy).toHaveBeenCalledWith(
      "📡 App is reachable at: http://localhost:5050"
    );
  });

  it("uses PORT from environment when provided", async () => {
    process.env.PORT = "6061";

    const listen = jest
      .fn()
      .mockImplementation(async (_port: number, cb?: () => void) => {
        cb?.();
      });
    const appMock = {
      listen,
      getUrl: jest.fn().mockResolvedValue("http://localhost:6061"),
    };

    jest.spyOn(NestFactory, "create").mockResolvedValue(appMock as any);
    jest
      .spyOn(createAppModule, "createApp")
      .mockImplementation(() => appMock as any);
    jest.spyOn(console, "log").mockImplementation(() => {});

    await bootstrap();

    expect(appMock.listen).toHaveBeenCalledWith(6061, expect.any(Function));
    expect(appMock.getUrl).toHaveBeenCalledTimes(1);
  });
});
