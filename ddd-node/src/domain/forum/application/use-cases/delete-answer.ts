import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../entreprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
import { AnswerRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
constructor(private answerRepository: AnswerRepository) {}

async execute({
answerId,
authorId
}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
  const question = await this.answerRepository.findById(answerId)

  if(!question) {
    throw new Error('Answer not found')
  }

  if(authorId != question.authorId.toString()) {
    throw new Error('Not allowed')
  }

  await this.answerRepository.delete(question)
 
  return {}
}
}