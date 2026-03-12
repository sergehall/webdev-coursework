import { ApiProperty } from "@nestjs/swagger";

export class AppHealthDto {
  @ApiProperty({ example: "ok" })
  status!: "ok";

  @ApiProperty({ example: true })
  ok!: boolean;

  @ApiProperty({ example: "2026-03-12T03:10:17.317Z" })
  ts!: string;

  @ApiProperty({
    example: 1234.56,
    description: "Process uptime in seconds.",
  })
  uptime!: number;
}
