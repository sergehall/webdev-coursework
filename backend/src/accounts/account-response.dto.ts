import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AcceptedDto {
  @ApiProperty({
    example: true,
    enum: [true],
    description:
      "Accepted without disclosing whether an account/email exists. Does not guarantee mail delivery.",
  })
  accepted!: boolean;
}
export class SavedDto {
  @ApiProperty({ example: true, enum: [true] })
  saved!: boolean;
}
export class CancelledDto {
  @ApiProperty({ example: true, enum: [true] })
  cancelled!: boolean;
}
export class VerifiedEmailDto {
  @ApiProperty({ example: true, enum: [true] })
  verified!: boolean;
  @ApiProperty({
    example: false,
    description:
      "True when confirming an added provider email revoked existing sessions.",
  })
  signInRequired!: boolean;
}
export class SignedOutDto {
  @ApiProperty({ example: false, enum: [false] })
  authenticated!: boolean;
}
export class SignedInDto {
  @ApiProperty({ example: true, enum: [true] })
  authenticated!: boolean;
}
export class LoginResponseDto {
  @ApiProperty({
    example: true,
    description:
      "False when an MFA challenge is required. No session is established until challenge verification succeeds.",
  })
  authenticated!: boolean;
  @ApiPropertyOptional({ example: true, enum: [true] })
  mfaRequired?: boolean;
}
export class LoginOptionsDto {
  @ApiProperty({ example: true })
  registrationEnabled!: boolean;
  @ApiProperty({ example: true })
  githubEnabled!: boolean;
}
export class ProviderStatusDto {
  @ApiProperty({ example: true })
  githubAvailable!: boolean;
  @ApiProperty({ example: true })
  emailAvailable!: boolean;
  @ApiProperty({
    type: String,
    nullable: true,
    example: "learner@example.test",
  })
  pendingEmail!: string | null;
  @ApiProperty({
    type: String,
    format: "date-time",
    nullable: true,
    example: "2026-10-02T18:00:00.000Z",
  })
  pendingEmailExpiresAt!: string | null;
}
export class ProviderRedirectDto {
  @ApiProperty({
    example:
      "https://github.com/login/oauth/authorize?client_id=example&state=example",
    format: "uri",
    description: "Navigate the browser to this provider authorization URL.",
  })
  url!: string;
}
export class AccountProfileResponseDto {
  @ApiProperty({ example: "Alex Learner" })
  displayName!: string;
  @ApiProperty({ example: "America/Los_Angeles" })
  timeZone!: string;
  @ApiProperty({ enum: ["system", "light", "dark"], example: "system" })
  theme!: string;
  @ApiProperty({ enum: [7, 30, 90], example: 30 })
  reportDays!: number;
  @ApiProperty({ enum: ["medium", "day-first", "iso"], example: "medium" })
  dateFormat!: string;
  @ApiProperty({ enum: ["12h", "24h"], example: "12h" })
  clockFormat!: string;
  @ApiProperty({ enum: [1, 7, 30, 365], example: 7 })
  activityDays!: number;
  @ApiProperty({ enum: [10, 25, 50], example: 10 })
  activityPageSize!: number;
  @ApiProperty({ example: "learner_01" })
  username!: string;
  @ApiProperty({
    type: String,
    nullable: true,
    example: "learner@example.test",
  })
  email!: string | null;
  @ApiProperty({ example: true })
  emailVerified!: boolean;
  @ApiProperty({ example: true })
  passwordEnabled!: boolean;
  @ApiProperty({ example: false })
  githubLinked!: boolean;
  @ApiProperty({ type: String, nullable: true, example: null })
  githubUsername!: string | null;
  @ApiProperty({ enum: ["administrator", "github", "email"], example: "email" })
  registrationMethod!: string;
}
export class AccountSessionResponseDto {
  @ApiProperty({ enum: ["admin", "client"], example: "client" })
  role!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:00:00.000Z" })
  issuedAt!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T18:00:00.000Z" })
  expiresAt!: string;
  @ApiProperty({ example: false })
  canManageRoles!: boolean;
  @ApiProperty({ example: true })
  mfaEnabled!: boolean;
  @ApiPropertyOptional({
    format: "date-time",
    example: "2026-10-02T17:00:00.000Z",
  })
  mfaVerifiedAt?: string;
  @ApiProperty({ enum: ["password", "github", "unknown"], example: "password" })
  authMethod!: string;
  @ApiProperty({ type: AccountProfileResponseDto })
  profile!: AccountProfileResponseDto;
}
export class SessionEntryDto {
  @ApiProperty({
    format: "uuid",
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
  })
  id!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:00:00.000Z" })
  issuedAt!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T18:00:00.000Z" })
  expiresAt!: string;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:10:00.000Z" })
  lastSeenAt!: string;
  @ApiProperty({
    enum: ["phone", "tablet", "desktop", "unknown"],
    example: "desktop",
  })
  device!: string;
  @ApiProperty({
    enum: ["iOS", "Android", "Windows", "macOS", "Linux", "Other"],
    example: "macOS",
  })
  os!: string;
  @ApiProperty({
    enum: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    example: "Safari",
  })
  browser!: string;
  @ApiProperty({ enum: ["password", "github", "unknown"], example: "password" })
  authMethod!: string;
  @ApiProperty({ example: true })
  current!: boolean;
}
export class SessionsPageDto {
  @ApiProperty({ type: [SessionEntryDto], maxItems: 5 })
  entries!: SessionEntryDto[];
  @ApiProperty({
    type: String,
    nullable: true,
    example: null,
    description:
      "Opaque cursor for the next page; null when no further page exists. Live-session filtering can yield fewer than five entries.",
  })
  nextCursor!: string | null;
}
export class AdminAccountDto {
  @ApiProperty({
    format: "uuid",
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
  })
  id!: string;
  @ApiProperty({ example: "learner_01" })
  username!: string;
  @ApiProperty({ example: "Alex Learner" })
  displayName!: string;
  @ApiProperty({ enum: ["admin", "client"], example: "client" })
  role!: string;
  @ApiProperty({
    type: String,
    nullable: true,
    example: "learner@example.test",
  })
  email!: string | null;
  @ApiProperty({ example: true })
  emailVerified!: boolean;
  @ApiProperty({ format: "date-time", example: "2026-10-02T17:00:00.000Z" })
  createdAt!: string;
}
