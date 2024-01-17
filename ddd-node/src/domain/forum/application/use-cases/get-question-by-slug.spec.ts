import { expect} from 'vitest'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '@/test/factories/make-question'
import { Slug } from '../../entreprise/entities/values-object/slug'


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Get Question by slug', () => {

  beforeEach(() => {
inMemoryQuestionRepository = new InMemoryQuestionsRepository()
sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })


  it('should be able to get a question by slug', async () => {

    const newQuestion =  makeQuestion({
      slug: Slug.create('javascript-question'),
    })

    await inMemoryQuestionRepository.create(newQuestion)


    const {question} = await sut.execute(
      {
        slug: 'javascript-question'
      }
  )
  

  expect(question.id).toBeTruthy()
  expect(question.title).toEqual(newQuestion.title)
  })

})


