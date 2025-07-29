import { IsString, IsNumber, IsArray } from "class-validator";

export class CorrectAnswerDto {
  @IsString()
  quizId!: string;

  @IsNumber()
  questionId!: number;

  @IsArray()
  @IsNumber({}, { each: true })
  correctAnswer!: number[];
}
