import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

// Anonymous practice identifiers are selectors, not authenticated account IDs.
export class ProgressIdentityDto {
  @ApiProperty({ example: "client-1", minLength: 1, maxLength: 128 })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  @Matches(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/)
  clientId!: string;

  @ApiProperty({
    example: "Internet-Programming",
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  @Matches(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/)
  appId!: string;

  @ApiProperty({ example: "CS80", minLength: 1, maxLength: 32 })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @Matches(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/)
  courseId!: string;
}
