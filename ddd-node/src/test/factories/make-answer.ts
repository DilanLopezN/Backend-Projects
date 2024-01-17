import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/entreprise/entities/answer";
import {faker} from '@faker-js/faker'
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const question = Answer.create({
    questionId: new UniqueEntityId(),
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}