import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Matches } from "class-validator";

export class MfaProofDto {
  @IsString()
  @Matches(/^(?:\d{6}|[A-Fa-f0-9]{5}(?:-[A-Fa-f0-9]{5}){3})$/)
  @ApiProperty({
    example: "123456",
    pattern: "^(?:\\d{6}|[A-Fa-f0-9]{5}(?:-[A-Fa-f0-9]{5}){3})$",
    writeOnly: true,
    description:
      "Authenticator code or unused recovery code. Enrollment accepts an authenticator code only.",
  })
  code!: string;
}
export class MfaEnrollmentDto extends MfaProofDto {
  @IsUUID("4")
  @ApiProperty({
    example: "ae2d9934-cf98-4d1a-9ce8-5150978b0b9c",
    format: "uuid",
    description: "UUID v4 returned by enroll.",
  })
  enrollmentId!: string;
}
