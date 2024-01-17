import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../entreprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
constructor(private questionsRepository: QuestionRepository) {}

async execute({
  authorId,
  content,
  title
}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
  const question = Question.create({
    authorId: new UniqueEntityId(authorId),
    content,
    title
  })

  await this.questionsRepository.create(question);

  return {
    question
  }
}
}