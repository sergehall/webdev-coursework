import { IsString } from "class-validator";

export class ResetProgressDto {
  @IsString()
  clientId!: string;

  @IsString()
  appId!: string;
}
