import { AnswerComment } from "../../entreprise/entities/answer-comment";


export interface AnswersCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
}