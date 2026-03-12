// src/tokens/dto/verify-token.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class VerifyTokenDto {
  @ApiProperty({
    description: "Token previously issued by /quizzes/:quizId/answers-token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  token!: string;
}
