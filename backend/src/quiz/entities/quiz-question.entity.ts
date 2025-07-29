import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("quiz_questions")
export class QuizQuestion {
  @PrimaryColumn({ name: "quiz_id", type: "varchar" })
  quizId!: string;

  @PrimaryColumn({ name: "question_id", type: "int" })
  questionId!: number;

  @Column({ name: "question_text", type: "varchar" })
  questionText!: string;

  @Column("text", { array: true })
  options!: string[];

  @Column("text", { array: true })
  images!: string[];
}
