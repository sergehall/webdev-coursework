import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";

export class OwnerLoginDto {
  // Bound/validate the transport field here; the configured security provider enforces presence.
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MinLength(1)
  @MaxLength(2048)
  @ApiPropertyOptional({
    maxLength: 2048,
    writeOnly: true,
    description:
      "Single-use Turnstile token; required when human verification is configured.",
  })
  turnstileToken?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(254)
  @ApiPropertyOptional({
    example: "learner_01",
    minLength: 3,
    maxLength: 254,
    nullable: true,
    description: "Username or email. Omit for the primary administrator.",
  })
  identity?: string;

  @IsString()
  @MinLength(12)
  @MaxLength(128)
  @ApiProperty({
    example: "example-passphrase-2026",
    minLength: 12,
    maxLength: 128,
    writeOnly: true,
  })
  password!: string;
}

export class OwnerProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Matches(/^[\p{L}\p{N} .'-]+$/u)
  @ApiProperty({
    example: "Alex Learner",
    minLength: 1,
    maxLength: 80,
    pattern: "^[\\p{L}\\p{N} .'-]+$",
    description:
      "Letters, numbers, spaces and punctuation . apostrophe or hyphen; whitespace-only values are rejected.",
  })
  displayName!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{3,40}$/)
  @ApiPropertyOptional({
    example: "learner_01",
    pattern: "^[a-zA-Z0-9_-]{3,40}$",
    minLength: 3,
    maxLength: 40,
  })
  username?: string;
}

export class OwnerPreferencesDto {
  @IsIn([7, 30, 90])
  @ApiProperty({ enum: [7, 30, 90], example: 30 })
  reportDays!: number;

  @IsIn(["system", "light", "dark"])
  @ApiProperty({ enum: ["system", "light", "dark"], example: "system" })
  theme!: "system" | "light" | "dark";

  @IsString()
  @MaxLength(64)
  @ApiProperty({
    example: "America/Los_Angeles",
    maxLength: 64,
    description: "Time zone recognized by Intl.DateTimeFormat.",
  })
  timeZone!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn(["medium", "day-first", "iso"])
  @ApiPropertyOptional({
    enum: ["medium", "day-first", "iso"],
    example: "medium",
  })
  dateFormat?: "medium" | "day-first" | "iso";

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn(["12h", "24h"])
  @ApiPropertyOptional({ enum: ["12h", "24h"], example: "12h" })
  clockFormat?: "12h" | "24h";

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn([1, 7, 30, 365])
  @ApiPropertyOptional({ enum: [1, 7, 30, 365], example: 7 })
  activityDays?: number;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn([10, 25, 50])
  @ApiPropertyOptional({ enum: [10, 25, 50], example: 10 })
  activityPageSize?: number;
}

export class OwnerPasswordDto extends OwnerLoginDto {
  @IsString()
  @MinLength(15)
  @MaxLength(128)
  @ApiProperty({
    example: "new-example-passphrase",
    minLength: 15,
    maxLength: 128,
    writeOnly: true,
  })
  newPassword!: string;
}

export class AccountRoleDto {
  @IsIn(["admin", "client"])
  @ApiProperty({ enum: ["admin", "client"], example: "client" })
  role!: "admin" | "client";
}

export class AuditQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsIn([10, 25, 50])
  @ApiPropertyOptional({ enum: [10, 25, 50], default: 10, example: 10 })
  limit: number = 10;
  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 7, 30, 365])
  @ApiPropertyOptional({ enum: [1, 7, 30, 365], default: 7, example: 7 })
  days: number = 7;
  @IsOptional()
  @IsIn(["all", "allowed", "denied"])
  @ApiPropertyOptional({
    enum: ["all", "allowed", "denied"],
    default: "all",
    example: "all",
  })
  result: "all" | "allowed" | "denied" = "all";
  @IsOptional()
  @IsIn([
    "all",
    "sign-in",
    "sessions",
    "profile",
    "security",
    "administration",
    "analytics",
    "limits",
  ])
  @ApiPropertyOptional({
    enum: [
      "all",
      "sign-in",
      "sessions",
      "profile",
      "security",
      "administration",
      "analytics",
      "limits",
    ],
    default: "all",
    example: "all",
  })
  group: string = "all";
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiPropertyOptional({
    maxLength: 300,
    example:
      "eyJhdCI6IjIwMjYtMTAtMDJUMDA6MDA6MDAuMDAwWiIsImlkIjoiYWUyZDk5MzQtY2Y5OC00ZDFhLTljZTgtNTE1MDk3OGIwYjljIn0",
    description:
      "Opaque nextCursor from the previous response; results ordered newest first.",
  })
  cursor?: string;
}

// Accept only supported categories before they reach the parameterized session query.
export class SessionQueryDto {
  @IsOptional()
  @IsIn(["desktop", "phone", "tablet", "unknown"])
  @ApiPropertyOptional({
    enum: ["desktop", "phone", "tablet", "unknown"],
    example: "desktop",
    description: "Optional device category filter.",
  })
  device?: "desktop" | "phone" | "tablet" | "unknown";

  @IsOptional()
  @IsIn(["github", "password", "unknown"])
  @ApiPropertyOptional({
    enum: ["github", "password", "unknown"],
    example: "password",
    description: "Optional sign-in method filter.",
  })
  authMethod?: "github" | "password" | "unknown";

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiPropertyOptional({
    maxLength: 300,
    description:
      "Opaque nextCursor from the previous response; newest first, up to five records per page.",
    example:
      "eyJhdCI6IjIwMjYtMTAtMDJUMDA6MDA6MDAuMDAwWiIsImlkIjoiYWUyZDk5MzQtY2Y5OC00ZDFhLTljZTgtNTE1MDk3OGIwYjljIn0",
  })
  cursor?: string;
}
