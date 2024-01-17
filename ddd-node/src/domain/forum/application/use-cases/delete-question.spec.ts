import { expect} from 'vitest'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '@/test/factories/make-question'
import { Slug } from '../../entreprise/entities/values-object/slug'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Delete Question', () => {

  beforeEach(() => {
inMemoryQuestionRepository = new InMemoryQuestionsRepository()
sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to delete a question by id', async () => {

    const newQuestion =  makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


   await sut.execute(
      {
        questionId: 'question-1',
        authorId: 'author-1'
      }
  )
  

  expect(inMemoryQuestionRepository.items).toHaveLength(0)

  })


  it('not should be able to delete a question by another user ', async () => {

    const newQuestion =  makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)



    expect(() => {
      return sut.execute(
        {
          questionId: 'question-1',
          authorId: 'author-2'
        } ) } ).rejects.toBeInstanceOf(Error)


  })

})

