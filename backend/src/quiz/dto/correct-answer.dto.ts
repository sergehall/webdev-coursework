import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from "class-validator";

export class CorrectAnswerDto {
  @ApiProperty({ example: "QuizModule1" })
  @IsString()
  quizId!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  questionId!: number;

  @ApiProperty({
    example: [0, 1, 3],
    description:
      "Array of indexes of the correct options for this question. Indexing starts from 0 (0-based). For example, [0,1,3] means that options with indexes 0, 1, and 3 are correct.",
  })
  @IsArray()
  @IsNumber({}, { each: true })
  correctAnswer!: number[];
}
