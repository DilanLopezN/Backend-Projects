import { AnswersCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/entreprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository implements AnswersCommentRepository {

  public items: AnswerComment[] = [];


  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);

  }


}