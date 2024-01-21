import { expect} from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from '@/test/factories/make-question'


let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer', () => {

  beforeEach(() => {
  inMemoryAnswerRepository = new InMemoryAnswersRepository()
  inMemoryQuestionRepository = new InMemoryQuestionsRepository()
  sut = new ChooseQuestionBestAnswerUseCase(
    inMemoryQuestionRepository,
    inMemoryAnswerRepository
    )
  })


  it('should be able to choose question best answer', async () => {

    const question =  makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)
   
   await sut.execute(
      {
        answerId: answer.id.toString(),
        authorId: question.authorId.toString(),
      }
  )
  

  expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)

  })


  it('should not be able to choose another user question best answer ', async () => {

   
    const question =  makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)
   
    expect(() => {
      return sut.execute(
        {
          answerId: answer.id.toString(),
          authorId: 'author-2'
        } ) } ).rejects.toBeInstanceOf(Error)


  })

})

