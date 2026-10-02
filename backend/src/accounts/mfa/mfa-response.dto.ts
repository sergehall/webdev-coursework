import { ApiProperty } from "@nestjs/swagger";

export class MfaStatusDto {
  @ApiProperty({ example: true })
  configured!: boolean;
  @ApiProperty({ example: true })
  enabled!: boolean;
  @ApiProperty({ example: false })
  pendingEnrollment!: boolean;
  @ApiProperty({
    type: String,
    nullable: true,
    format: "date-time",
    example: "2026-10-02T17:00:00.000Z",
  })
  enrolledAt!: string | null;
  @ApiProperty({ example: 8, minimum: 0 })
  recoveryCodesRemaining!: number;
  @ApiProperty({
    type: String,
    nullable: true,
    format: "date-time",
    example: "2026-10-02T17:00:00.000Z",
  })
  currentSessionVerifiedAt!: string | null;
}
export class MfaSetupDto {
  @ApiProperty({
    example: "EXAMPLEONLYDONOTUSE",
    description:
      "One-time authenticator enrollment secret for this signed-in account. Render locally; do not log or send to a remote QR service.",
  })
  secret!: string;
  @ApiProperty({ example: "Web Engineering Portfolio" })
  issuer!: string;
  @ApiProperty({ example: "learner_01" })
  accountName!: string;
  @ApiProperty({
    example:
      "otpauth://totp/Example:learner_01?secret=EXAMPLEONLYDONOTUSE&issuer=Example",
    description: "One-time enrollment URI; render a QR code locally.",
  })
  otpauthUri!: string;
  @ApiProperty({
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
    format: "uuid",
  })
  enrollmentId!: string;
  @ApiProperty({ example: "2026-10-02T17:10:00.000Z", format: "date-time" })
  expiresAt!: string;
}
export class MfaEnrollmentResponseDto {
  @ApiProperty({ type: MfaSetupDto })
  setup!: MfaSetupDto;
  @ApiProperty({ type: MfaStatusDto })
  mfa!: MfaStatusDto;
}
export class MfaResponseDto {
  @ApiProperty({ type: MfaStatusDto })
  mfa!: MfaStatusDto;
}
export class MfaRecoveryResponseDto extends MfaResponseDto {
  @ApiProperty({
    type: [String],
    example: ["aaaaa-bbbbb-ccccc-ddddd"],
    description:
      "Recovery codes shown once. Store securely; each code is single use. Regeneration invalidates old codes.",
  })
  recoveryCodes!: string[];
}
export class MfaChallengeResponseDto {
  @ApiProperty({ example: "2026-10-02T17:05:00.000Z", format: "date-time" })
  expiresAt!: string;
}
