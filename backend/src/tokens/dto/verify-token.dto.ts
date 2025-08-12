// src/tokens/dto/verify-token.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class VerifyTokenDto {
  @ApiProperty({
    description: "Token previously issued by /quizzes/:quizId/answers-token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  token!: string;
}
