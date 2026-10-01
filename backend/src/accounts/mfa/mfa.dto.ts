import { IsString, IsUUID, Matches } from "class-validator";

export class MfaProofDto {
  @IsString()
  @Matches(/^(?:\d{6}|[A-Fa-f0-9]{5}(?:-[A-Fa-f0-9]{5}){3})$/)
  code!: string;
}
export class MfaEnrollmentDto extends MfaProofDto {
  @IsUUID("4")
  enrollmentId!: string;
}
