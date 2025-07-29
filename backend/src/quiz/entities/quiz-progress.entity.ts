import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("quiz_progress")
@Unique(["clientId", "appId"])
export class QuizProgress {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "character varying", nullable: false })
  clientId!: string;

  @Column({ type: "character varying", nullable: false })
  appId!: string;

  @Column("int", { array: true, nullable: false })
  completedModules!: number[];

  @Column({ type: "character varying", nullable: false })
  createdAt!: string;
}
