import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QuizProgressDto {
  @ApiProperty({ example: "clientId" })
  @IsString()
  clientId!: string;

  @ApiProperty({ example: "Internet-Programming" })
  @IsString()
  appId!: string;

  @ApiProperty({ example: "CS80" })
  @IsString()
  courseId!: string;

  @ApiProperty({ example: 3, description: "Module number to mark/unmark." })
  @Type(() => Number)
  @IsNumber()
  moduleNumber!: number;
}
