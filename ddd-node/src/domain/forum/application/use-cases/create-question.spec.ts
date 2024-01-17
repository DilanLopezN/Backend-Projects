import { expect} from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create Question', () => {

  beforeEach(() => {
inMemoryQuestionRepository = new InMemoryQuestionsRepository()
sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to create a question', async () => {

    const {question} = await sut.execute(
      {
        authorId: '1',
        title: 'Fon',
        content: 'Nova resposta',
      }
  )
  
  expect(question.content).toEqual('Nova resposta')
  expect(question.authorId).toBeTruthy()
  
  })

})


