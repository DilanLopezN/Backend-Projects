import { expect} from 'vitest'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('Edit Question', () => {

  beforeEach(() => {
inMemoryQuestionRepository = new InMemoryQuestionsRepository()
sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to edit a question by id', async () => {

    const newQuestion =  makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


   await sut.execute(
      {
        questionId: newQuestion.id.toValue(),
        authorId: 'author-1',
        title: 'Pergunta test',
        content: 'Content test'
      }
  )
  

  expect(inMemoryQuestionRepository.items[0]).toMatchObject({
    title: 'Pergunta test',
    content: 'Content test'
  })

  })


  it('not should be able to edit a question by another user ', async () => {

    const newQuestion =  makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    expect(() => {
      return sut.execute(
        {
          questionId: newQuestion.id.toValue(),
          authorId: 'author-2',
          title: 'Pergunta test',
          content: 'Content test'
        } ) } ).rejects.toBeInstanceOf(Error)


  })

})

