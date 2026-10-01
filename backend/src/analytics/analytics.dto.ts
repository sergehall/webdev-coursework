import { Type } from "class-transformer";
import {
  Equals,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";
import { QR_CAMPAIGN } from "./analytics.types";

export class QrEventDto {
  @IsUUID("4")
  eventId!: string;

  @Equals(QR_CAMPAIGN)
  campaign!: typeof QR_CAMPAIGN;
}

export class OwnerLoginDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(254)
  identity?: string;

  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;
}

export class OwnerProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  @Matches(/^[\p{L}\p{N} .'-]+$/u)
  displayName!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]{3,40}$/)
  username?: string;
}

export class OwnerPreferencesDto {
  @IsIn([7, 30, 90])
  reportDays!: number;

  @IsIn(["system", "light", "dark"])
  theme!: "system" | "light" | "dark";

  @IsString()
  @MaxLength(64)
  timeZone!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn(["medium", "day-first", "iso"])
  dateFormat?: "medium" | "day-first" | "iso";

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn(["12h", "24h"])
  clockFormat?: "12h" | "24h";

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn([1, 7, 30, 365])
  activityDays?: number;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsIn([10, 25, 50])
  activityPageSize?: number;
}

export class OwnerPasswordDto extends OwnerLoginDto {
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  newPassword!: string;
}

export class AccountRoleDto {
  @IsIn(["admin", "client"])
  role!: "admin" | "client";
}

export class AuditQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsIn([10, 25, 50])
  limit: number = 10;
  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 7, 30, 365])
  days: number = 7;
  @IsOptional()
  @IsIn(["all", "allowed", "denied"])
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
  group: string = "all";
  @IsOptional()
  @IsString()
  @MaxLength(300)
  cursor?: string;
}

export class SessionQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  cursor?: string;
}
