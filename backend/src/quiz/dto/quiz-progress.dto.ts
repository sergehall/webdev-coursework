import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min, Max } from "class-validator";
import { ProgressIdentityDto } from "./progress-identity.dto";

export class QuizProgressDto extends ProgressIdentityDto {
  @ApiProperty({
    example: 3,
    minimum: 1,
    maximum: 1000,
    description: "Integer module number to mark/unmark.",
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  moduleNumber!: number;
}
