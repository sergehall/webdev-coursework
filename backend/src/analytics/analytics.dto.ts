import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsUUID } from "class-validator";
import { QR_CAMPAIGN } from "./analytics.types";

export class QrEventDto {
  @IsUUID("4")
  @ApiProperty({
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
    format: "uuid",
    description: "UUID v4; repeated IDs are deduplicated.",
  })
  eventId!: string;

  @Equals(QR_CAMPAIGN)
  @ApiProperty({ enum: [QR_CAMPAIGN], example: QR_CAMPAIGN })
  campaign!: typeof QR_CAMPAIGN;
}
