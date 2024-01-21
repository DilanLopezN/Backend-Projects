import { expect} from 'vitest'
import { makeQuestion } from '@/test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'


let inMemoryAnwsersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase
describe('Fetch Questions Answers', () => {

  beforeEach(() => {
inMemoryAnwsersRepository = new InMemoryAnswersRepository()
sut = new FetchQuestionAnswersUseCase(inMemoryAnwsersRepository)
  })


  it('should be able to fetch question answer', async () => {

await inMemoryAnwsersRepository.create(
  makeAnswer({questionId: new UniqueEntityId('question-1')})
)
await inMemoryAnwsersRepository.create(
  makeAnswer({questionId: new UniqueEntityId('question-1')})
)
await inMemoryAnwsersRepository.create(
  makeAnswer({questionId: new UniqueEntityId('question-1')})
)


  const {answers} = await sut.execute({
    page: 1,
    questionId: 'question-1'
  })

  expect(answers).toHaveLength(3)

  })


  it('should be able to fetch paginated question answer', async () => {

    for(let i = 1; i <= 22; i++) {
      await inMemoryAnwsersRepository.create(
        makeAnswer({questionId: new UniqueEntityId('question-1')})
      )
   
    }
    
      const {answers} = await sut.execute({
        page: 2,
        questionId: 'question-1'
      })
    
      expect(answers).toHaveLength(2)
    
      })
    


})

