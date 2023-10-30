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
  const answer = new Answer({content, authorId: instructorId, questionId})


  await this.answersRepository.create(answer)


  return answer
}
}