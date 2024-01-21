import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../entreprise/entities/question";

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findManyRecente(params: PaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
