import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiDocService } from "./swagger/api-doc.service";
import { AppMethods } from "./swagger/enums/app-methods.enum";
import { EndpointKeys } from "./swagger/enums/endpoint-keys.enum";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiDocService.apply(EndpointKeys.App, AppMethods.Health)
  @Get("health")
  health() {
    return { ok: true, ts: new Date().toISOString() };
  }

  @ApiDocService.apply(EndpointKeys.App, AppMethods.Info)
  @Get("info")
  info() {
    return { name: "SMC Backend API", version: "1.0.0" };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
