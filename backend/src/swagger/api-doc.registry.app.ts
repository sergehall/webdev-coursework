import { AppHealthDto } from "../app/dto/app-health.dto";
import { AppInfoDto } from "../app/dto/app-info.dto";
import { ApiDoc } from "./api-doc.builder";
import { AppMethods } from "./enums/app-methods.enum";

export const appApiDocRegistry = {
  [AppMethods.GetHello]: (description?: string) =>
    ApiDoc({
      summary: "API landing page (HTML)",
      description,
      ok: {
        schema: {
          type: "string",
          example: "<!doctype html>...",
        },
      },
    }),
  [AppMethods.Health]: (description?: string) =>
    ApiDoc({
      summary: "Service health check",
      description,
      ok: { type: AppHealthDto },
    }),
  [AppMethods.Info]: (description?: string) =>
    ApiDoc({
      summary: "Service info",
      description,
      ok: { type: AppInfoDto },
    }),
  [AppMethods.Robots]: (description?: string) =>
    ApiDoc({
      summary: "Robots directives for crawlers",
      description,
      ok: {
        schema: {
          type: "string",
          example: "User-agent: *\nAllow: /",
        },
      },
    }),
} as const;
