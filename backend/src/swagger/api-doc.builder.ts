// src/swagger/api-doc.builder.ts
import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiSecurity,
} from "@nestjs/swagger";

type SecurityType = "bearer" | "answersToken";
type SecurityItem = { type: SecurityType };

export interface ApiDocOptions {
  summary?: string;
  description?: string;
  // empty array => public operation (without “lock”)
  security?: SecurityItem[];
  ok?: { type?: Type<any>; schema?: any; isArray?: boolean };
  responses?: Array<{
    status: number;
    type?: Type<any>;
    description?: string;
    schema?: any;
  }>;
  queries?: Parameters<typeof ApiQuery>[0][];
  addUnauthorizedByDefault?: boolean; // default is true, but is skipped if security=[]
}

export function ApiDoc(opts: ApiDocOptions = {}) {
  const {
    summary,
    description,
    security = [{ type: "bearer" }],
    ok,
    responses = [],
    queries = [],
    addUnauthorizedByDefault = true,
  } = opts;

  const ds: any[] = [];

  if (summary || description) ds.push(ApiOperation({ summary, description }));

  // security
  if (security.length > 0) {
    security.forEach((s) => {
      if (s.type === "bearer") ds.push(ApiBearerAuth("bearer"));
      if (s.type === "answersToken") ds.push(ApiSecurity("answersToken"));
    });
  }

  // 200 OK / main successful
  if (ok?.type || ok?.schema) {
    ds.push(
      ApiOkResponse({
        ...(ok.type ? { type: ok.type } : {}),
        ...(ok.schema ? { schema: ok.schema } : {}),
        isArray: !!ok?.isArray,
      })
    );
  }

  // additional answers
  responses.forEach((r) => ds.push(ApiResponse(r)));

  // query parameters
  queries.forEach((q) => ds.push(ApiQuery(q)));

  // 401 by default, but only if the operation is not public
  if (security.length > 0 && addUnauthorizedByDefault) {
    ds.push(ApiUnauthorizedResponse({ description: "Unauthorized" }));
  }

  return applyDecorators(...ds);
}
