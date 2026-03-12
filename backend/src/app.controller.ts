import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { join } from "path";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocService } from "./swagger/api-doc.service";
import { AppMethods } from "./swagger/enums/app-methods.enum";
import { EndpointKeys } from "./swagger/enums/endpoint-keys.enum";

@Controller()
@ApiTags("System")
export class AppController {
  @ApiDocService.apply(EndpointKeys.App, AppMethods.Health)
  @Get("health")
  health() {
    return {
      status: "ok",
      ok: true,
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
      release:
        process.env.HEROKU_RELEASE_VERSION ??
        process.env.RELEASE_VERSION ??
        "local",
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
