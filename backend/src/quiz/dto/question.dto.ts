import { IsNumber, IsString, IsArray, ArrayNotEmpty } from "class-validator";

export class QuestionDto {
  @IsNumber()
  questionId!: number;

  @IsString()
  questionText!: string;

  @IsArray()
  @ArrayNotEmpty()
  options!: string[];

  @IsArray()
  images!: string[];
}
