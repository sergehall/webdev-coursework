import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResetProgressDto {
  @ApiProperty({ example: "clientId" })
  @IsString()
  clientId!: string;

  @ApiProperty({ example: "CS80" })
  @IsString()
  courseId!: string;

  @ApiProperty({ example: "Internet-Programming" })
  @IsString()
  appId!: string;
}
