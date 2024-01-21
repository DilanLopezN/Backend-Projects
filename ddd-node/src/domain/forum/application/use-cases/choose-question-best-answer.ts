import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../entreprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";
import { Question } from "../../entreprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
constructor(
  private questionsRepository: QuestionRepository,
  private answersRepository: AnswerRepository
  ) {}

async execute({answerId,authorId}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

  const answer = await this.answersRepository.findById(answerId);

  if(!answer) {
    throw new Error('Could not find answer')
  }    

  const question = await this.questionsRepository.findById(answer.questionId.toString())

  if(!question) {
    throw new Error('Could not find question')
  }  

  if(authorId != question.authorId.toString()) {
    throw new Error('Not allowed')
  }
 
  question.bestAnswerId = answer.id

  await this.questionsRepository.save(question)

  return {
    question
  }
  

}
}