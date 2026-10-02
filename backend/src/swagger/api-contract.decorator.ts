import { applyDecorators, type Type } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ApiErrorDto } from "./api-error.dto";

export function ApiErrors(...statuses: number[]) {
  const descriptions: Record<number, string> = {
    400: "Invalid input, cursor, expired link or proof.",
    401: "Missing, expired or revoked session / MFA challenge.",
    403: "Untrusted origin, insufficient permission, recent sign-in or MFA step-up required.",
    409: "Conflicting account state or existing MFA enrollment.",
    429: "Request limit exceeded. Respect Retry-After when present; account-specific limits may also apply.",
    503: "Service or request-protection storage temporarily unavailable.",
  };
  return applyDecorators(
    ...statuses.map((status) =>
      ApiResponse({
        status,
        description: descriptions[status],
        type: ApiErrorDto,
        ...(status === 429
          ? {
              headers: {
                "Retry-After": {
                  description:
                    "Seconds until the global throttle window resets (when rejected by the global throttle).",
                  schema: { type: "integer", minimum: 1 },
                },
              },
            }
          : {}),
      })
    )
  );
}

export function ApiContract(
  summary: string,
  description: string,
  response: Type<unknown>,
  options: {
    status?: number;
    auth?: "session" | "challenge";
    isArray?: boolean;
    conflict?: boolean;
  } = {}
) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({
      status: options.status ?? 200,
      description: "Successful response.",
      type: response,
      isArray: options.isArray,
    }),
    ApiErrors(
      400,
      403,
      429,
      503,
      ...(options.auth ? [401] : []),
      ...(options.conflict ? [409] : [])
    ),
    ...(options.auth
      ? [
          ApiCookieAuth(
            options.auth === "session" ? "account-session" : "mfa-challenge"
          ),
        ]
      : [])
  );
}
