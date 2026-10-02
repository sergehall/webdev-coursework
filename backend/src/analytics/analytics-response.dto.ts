import { ApiProperty } from "@nestjs/swagger";
import { QR_CAMPAIGN } from "./analytics.types";

export class AuditEntryDto {
  @ApiProperty({
    format: "uuid",
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
  })
  eventId!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:00:00.000Z" })
  occurredAt!: string;
  @ApiProperty({ enum: ["site-owner", "anonymous"], example: "site-owner" })
  actor!: string;
  @ApiProperty({ example: "owner.login" })
  action!: string;
  @ApiProperty({ example: true })
  allowed!: boolean;
}
export class AuditPageDto {
  @ApiProperty({ type: [AuditEntryDto], maxItems: 50 })
  entries!: AuditEntryDto[];
  @ApiProperty({
    type: String,
    nullable: true,
    example: null,
    description:
      "Opaque next-page cursor; null when exhausted. Ordered by event time and ID descending.",
  })
  nextCursor!: string | null;
}
export class AnalyticsDashboardDto {
  @ApiProperty({ enum: [QR_CAMPAIGN], example: QR_CAMPAIGN })
  campaign!: string;
  @ApiProperty({ enum: [7, 30, 90], example: 30 })
  days!: number;
  @ApiProperty({ example: 42, minimum: 0 })
  total!: number;
  @ApiProperty({
    type: "object",
    additionalProperties: { type: "integer", minimum: 0 },
    example: { "2026-10-02": 42 },
    description: "Visit counts by UTC day.",
  })
  daily!: Record<string, number>;
  @ApiProperty({
    type: "object",
    additionalProperties: { type: "integer", minimum: 0 },
    example: { desktop: 42 },
  })
  devices!: Record<string, number>;
  @ApiProperty({
    type: "object",
    additionalProperties: { type: "integer", minimum: 0 },
    example: { macOS: 42 },
  })
  systems!: Record<string, number>;
  @ApiProperty({
    type: "object",
    additionalProperties: { type: "integer", minimum: 0 },
    example: { Safari: 42 },
  })
  browsers!: Record<string, number>;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:00:00.000Z" })
  generatedAt!: string;
}
