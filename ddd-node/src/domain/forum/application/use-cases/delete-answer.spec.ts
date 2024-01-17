import { expect} from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '@/test/factories/make-answer'


let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
describe('Delete Answer', () => {

  beforeEach(() => {
inMemoryAnswerRepository = new InMemoryAnswersRepository()
  sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })


  it('should be able to delete a answer by id', async () => {

    const newAnwser =  makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnwser)


   await sut.execute(
      {
        answerId: 'answer-1',
        authorId: 'author-1'
      }
  )
  

  expect(inMemoryAnswerRepository.items).toHaveLength(0)

  })


  it('not should be able to delete a answer by another user ', async () => {

    const newAnswer =  makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)



    expect(() => {
      return sut.execute(
        {
          answerId: 'answer-1',
          authorId: 'author-2'
        } ) } ).rejects.toBeInstanceOf(Error)


  })

})

