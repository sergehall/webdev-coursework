import { IsString } from "class-validator";

export class ResetProgressDto {
  @IsString()
  clientId!: string;

  @IsString()
  courseId!: string;

  @IsString()
  appId!: string;
}
