import { Answer } from "../../entreprise/entities/answer";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}