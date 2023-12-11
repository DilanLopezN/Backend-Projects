import { Question } from "../../entreprise/entities/question";

export interface QuestionRepository {
  create(question: Question): Promise<void>
}