import { QuestionComment } from "../../entreprise/entities/question-comment";

export interface QuestionsCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
}
