import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiErrorDto {
  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({
    description: "Human-readable error or field validation errors.",
    oneOf: [
      { type: "string", example: "Validation failed" },
      {
        type: "array",
        items: {
          oneOf: [
            { type: "string" },
            {
              type: "object",
              required: ["field", "message"],
              properties: {
                field: { type: "string", example: "email" },
                message: { type: "string", example: "email must be an email" },
              },
            },
          ],
        },
      },
    ],
  })
  message!: string | (string | { field: string; message: string })[];

  @ApiPropertyOptional({ example: "Bad Request" })
  error?: string;

  @ApiPropertyOptional({
    example: "MFA_STEP_UP_REQUIRED",
    description:
      "Optional actionable account error code, for example MFA_STEP_UP_REQUIRED, RECENT_SIGN_IN_REQUIRED or LAST_SIGN_IN_METHOD.",
  })
  code?: string;
}
