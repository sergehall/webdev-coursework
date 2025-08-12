import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsArray, ArrayNotEmpty } from "class-validator";

export class QuizQuestionDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  questionId!: number;

  @ApiProperty({ example: "What is JavaScript?" })
  @IsString()
  questionText!: string;

  @ApiProperty({
    type: [String],
    example: ["Lang", "Script", "Web", "Browser API"],
  })
  @IsArray()
  @ArrayNotEmpty()
  options!: string[];

  @ApiProperty({ type: [String], example: ["https://.../q3-1.png"] })
  @IsArray()
  images!: string[];
}
