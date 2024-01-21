import { QuestionsCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { QuestionComment } from "@/domain/forum/entreprise/entities/question-comment";

export class InMemoryQuestionCommentRepository implements QuestionsCommentRepository {

  public items: QuestionComment[] = [];


  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);

  }


}