import { ApiProperty } from "@nestjs/swagger";

export class AppHealthDto {
  @ApiProperty({
    enum: ["ok", "error"],
    example: "ok",
    description: 'Overall service status. "error" when the database is unreachable.',
  })
  status!: "ok" | "error";

  @ApiProperty({ example: true })
  ok!: boolean;

  @ApiProperty({
    enum: ["reachable", "unreachable"],
    example: "reachable",
    description: "Database connectivity status.",
  })
  db!: "reachable" | "unreachable";

  @ApiProperty({
    enum: ["CLOSED", "OPEN", "HALF_OPEN"],
    example: "CLOSED",
    description:
      "Circuit breaker state. OPEN means requests are failing fast without hitting the DB.",
  })
  circuit!: "CLOSED" | "OPEN" | "HALF_OPEN";

  @ApiProperty({ example: "2026-03-12T03:10:17.317Z" })
  ts!: string;

  @ApiProperty({
    example: 1234.56,
    description: "Process uptime in seconds.",
  })
  uptime!: number;
}
