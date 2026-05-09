import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("webdev_correct_answers")
export class CorrectAnswer {
  @PrimaryColumn({ name: "quiz_id", type: "varchar" })
  quizId!: string;

  @PrimaryColumn({ name: "question_id", type: "int" })
  questionId!: number;

  @Column("int", { array: true, name: "correct_answer" })
  correctAnswer!: number[];
}
