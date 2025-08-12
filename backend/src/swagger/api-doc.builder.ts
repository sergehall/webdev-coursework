// src/swagger/api-doc.builder.ts
import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SWAGGER_SECURITY, SecuritySchemeName } from "./security.constants";

type SecurityItem = { type: "bearer"; name?: SecuritySchemeName };

export interface ApiDocOptions {
  summary?: string;
  description?: string;
  /**
   * Security:
   * - [] or undefined => public (no lock)
   * - [{ type: 'bearer', name?: SecuritySchemeName }] => attach named bearer scheme
   */
  security?: SecurityItem[];
  ok?: { type?: Type<any>; schema?: any; isArray?: boolean };
  responses?: Array<{
    status: number;
    type?: Type<any>;
    description?: string;
    schema?: any;
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

  const ds: any[] = [];

  if (summary || description) {
    ds.push(ApiOperation({ summary, description }));
  }

  // Attach bearer only if security is provided
  if (security.length > 0) {
    for (const s of security) {
      if (s.type === "bearer") {
        ds.push(ApiBearerAuth(s.name ?? defaultBearerName));
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
