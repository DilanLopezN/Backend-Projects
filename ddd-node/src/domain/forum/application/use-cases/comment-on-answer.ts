import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../entreprise/entities/answer-comment";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswersCommentRepository } from "../repositories/answer-comment-repository";

interface CommentAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string
}

interface CommentAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentAnswerUseCase {
constructor(
  private answersRepository: AnswerRepository,
  private answerCommentRepository: AnswersCommentRepository
  
  ) {}

async execute({
  authorId,
  answerId,
  content
}: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {

  const answer = await this.answersRepository.findById(answerId)

  if(!answer) {
    throw new Error('Question not found')
  }

  const answerComment = AnswerComment.create({
    authorId: new UniqueEntityId(authorId),
    answerId: new UniqueEntityId( answerId),
    content:  content
  })
  
  await this.answerCommentRepository.create(answerComment)
  

  return {
    answerComment
  }
 
}
}