import { Answer } from "../../entreprise/entities/answer";
import { Question } from "../../entreprise/entities/question";
import { AnswerRepository } from "../repositories/answer-repository";
import { QuestionRepository } from "../repositories/question-repository";

interface FetchQuestionAnswersUseCaseRequest {
page: number;
questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
constructor(private answersRepository: AnswerRepository) {}

async execute({
  page,
  questionId
}: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {

  const answers  = await this.answersRepository.findManyByQuestionId(
    questionId,
    {page});



  return {
    answers
  }
}
}