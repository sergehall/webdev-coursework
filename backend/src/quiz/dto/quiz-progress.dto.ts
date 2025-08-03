import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QuizProgressDto {
  @IsString()
  clientId!: string;

  @IsString()
  appId!: string;

  @IsString()
  courseId!: string;

  @Type(() => Number)
  @IsNumber()
  moduleNumber!: number;
}
