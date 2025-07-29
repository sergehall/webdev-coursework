import { IsString, IsArray, ArrayNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateQuestionDto {
  @IsString()
  quizId!: string;

  @Type(() => Number)
  @IsNumber()
  questionId!: number;

  @IsString()
  questionText!: string;

  @IsArray()
  @ArrayNotEmpty()
  options!: string[];
}
