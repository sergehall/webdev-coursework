import { Controller, Get, HttpCode, Res } from "@nestjs/common";
import type { Response } from "express";
import { join } from "path";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocService } from "./swagger/api-doc.service";
import { AppMethods } from "./swagger/enums/app-methods.enum";
import { EndpointKeys } from "./swagger/enums/endpoint-keys.enum";
import { getReleaseIdentifier } from "./app/release.utils";
import { CircuitBreakerService } from "./app/circuit-breaker.service";

@Controller()
@ApiTags("System")
export class AppController {
  constructor(private readonly circuitBreaker: CircuitBreakerService) {}

  @ApiDocService.apply(EndpointKeys.App, AppMethods.Health)
  @Get("health")
  @HttpCode(200)
  async health(@Res({ passthrough: true }) res: Response) {
    const dbOk = await this.circuitBreaker.probe();
    const circuit = this.circuitBreaker.getState();

    if (!dbOk) {
      res.status(503);
      return {
        status: "error",
        ok: false,
        db: "unreachable",
        circuit,
        ts: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }

    return {
      status: "ok",
      ok: true,
      db: "reachable",
      circuit,
      ts: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @ApiDocService.apply(EndpointKeys.App, AppMethods.Info)
  @Get("info")
  info() {
    return {
      name: "Webdev Coursework API",
      version: "1.0.0",
      docsEnabled: true,
      endpoints: {
        docs: "/docs",
        health: "/health",
        info: "/info",
      },
      release: getReleaseIdentifier(),
    };
  }

  @Get("robots.txt")
  @ApiDocService.apply(EndpointKeys.App, AppMethods.Robots)
  robots(@Res() res: Response): void {
    res.sendFile(join(__dirname, "..", "public", "robots.txt"));
  }

  @ApiDocService.apply(EndpointKeys.App, AppMethods.GetHello)
  @Get()
  getHello(@Res() res: Response): void {
    res.sendFile(join(__dirname, "..", "public", "index.html"));
  }
}
