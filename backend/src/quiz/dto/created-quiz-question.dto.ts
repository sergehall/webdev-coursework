import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreatedQuizQuestionDto {
  @ApiProperty({ example: "QuizModule1" })
  @IsString()
  quizId!: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  questionId!: number;

  @ApiProperty({ example: "What is JavaScript?" })
  @IsString()
  questionText!: string;

  @ApiProperty({
    type: [String],
    example: ["Language", "Database", "Operating System", "Browser API"],
  })
  @IsArray()
  options!: string[];

  @ApiProperty({
    type: [String],
    example: ["/uploads/q3-1.png"],
    description: "Relative uploaded image paths attached to the question.",
  })
  @IsArray()
  images!: string[];
}
