import { expect} from 'vitest'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeAnswer } from '@/test/factories/make-answer'


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
describe('Edit Answer', () => {

  beforeEach(() => {
inMemoryAnswersRepository = new InMemoryAnswersRepository()
sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })


  it('should be able to edit a question by id', async () => {

    const newQuestion =  makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswersRepository.create(newQuestion)


   await sut.execute(
      {
        answerId: newQuestion.id.toValue(),
        authorId: 'author-1',
        content: 'Content test'
      }
  )
  

  expect(inMemoryAnswersRepository.items[0]).toMatchObject({
    content: 'Content test'
  })

  })


  it('not should be able to edit a question by another user ', async () => {

    const newQuestion =  makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answwer-1'))

    await inMemoryAnswersRepository.create(newQuestion)


    expect(() => {
      return sut.execute(
        {
          answerId: newQuestion.id.toValue(),
          authorId: 'author-2',
          content: 'Content test'
        } ) } ).rejects.toBeInstanceOf(Error)


  })

})

