import { expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

describe('Create Answer', () => {

  let inMemoryAnswerRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)


  })


  it('should be able to create an answer', async () => {
  
    const answer = await sut.execute(
      {
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '2',
      }
  )
  
        expect(answer.content).toEqual('Nova resposta')
  
  })

})

