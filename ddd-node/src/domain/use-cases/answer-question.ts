import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";
interface AnswerQuestionUseCase {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
constructor(private answersRepository: AnswerRepository) {}

async execute({instructorId, questionId, content}: AnswerQuestionUseCase) {
  const answer =  Answer.create({content, authorId: new UniqueEntityId(instructorId), questionId: new UniqueEntityId(questionId)})


  await this.answersRepository.create(answer)


  return answer
}
}