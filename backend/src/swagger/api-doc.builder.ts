// src/swagger/api-doc.builder.ts
import type { Type } from "@nestjs/common";
import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiSecurity,
} from "@nestjs/swagger";
import type { SecuritySchemeName } from "./security.constants";
import { SWAGGER_SECURITY } from "./security.constants";

type SecurityItem =
  | { type: "bearer"; name?: SecuritySchemeName }
  | { type: "apiKey"; name: string };

export interface ApiDocOptions {
  summary?: string;
  description?: string;
  /**
   * Security:
   * - [] or undefined => public (no lock)
   * - [{ type: 'bearer', name?: SecuritySchemeName }] => attach named bearer scheme
   */
  security?: SecurityItem[];
  ok?: { type?: Type<unknown>; schema?: Record<string, unknown>; isArray?: boolean };
  responses?: Array<{
    status: number;
    type?: Type<unknown>;
    description?: string;
    schema?: Record<string, unknown>;
  }>;
  queries?: Parameters<typeof ApiQuery>[0][];
  /** Adds 401 automatically only for secured endpoints. */
  addUnauthorizedByDefault?: boolean;
  /** Default bearer name if not provided in a security item. */
  defaultBearerName?: SecuritySchemeName; // defaults to SWAGGER_SECURITY.ANSWERS_TOKEN
}

export function ApiDoc(opts: ApiDocOptions = {}) {
  const {
    summary,
    description,
    security = [], // public by default
    ok,
    responses = [],
    queries = [],
    addUnauthorizedByDefault = true,
    defaultBearerName = SWAGGER_SECURITY.ANSWERS_TOKEN,
  } = opts;

  const ds: Parameters<typeof applyDecorators> = [];

  if (summary || description) {
    ds.push(ApiOperation({ summary, description }));
  }

  // Attach bearer only if security is provided
  if (security.length > 0) {
    for (const s of security) {
      if (s.type === "bearer") {
        ds.push(ApiBearerAuth(s.name ?? defaultBearerName));
      } else if (s.type === "apiKey") {
        ds.push(ApiSecurity(s.name));
      }
    }
  }

  // 200 OK / main successful response
  if (ok?.type || ok?.schema) {
    ds.push(
      ApiOkResponse({
        ...(ok.type ? { type: ok.type } : {}),
        ...(ok.schema ? { schema: ok.schema } : {}),
        isArray: !!ok?.isArray,
      })
    );
  }

  // Additional responses
  for (const r of responses) ds.push(ApiResponse(r));

  // Query parameters
  for (const q of queries) ds.push(ApiQuery(q));

  // Add 401 only for secured operations
  if (security.length > 0 && addUnauthorizedByDefault) {
    ds.push(ApiUnauthorizedResponse({ description: "Unauthorized" }));
  }

  return applyDecorators(...ds);
}
