import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/entreprise/entities/question";
import { Slug } from "@/domain/forum/entreprise/entities/values-object/slug";
import {faker} from '@faker-js/faker'
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create({
    title: faker.lorem.sentence(),
    slug: Slug.create('javascript-question'),
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}