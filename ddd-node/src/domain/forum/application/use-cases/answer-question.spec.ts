import { expect, test} from 'vitest'
import { AnswerQuestion } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../entreprise/entities/answer'


const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

  const answer = await answerQuestion.execute(
    {content: 'Nova resposta',
    instructorId: '1',
    questionId: '2'
    }
)

expect(answer.content).toEqual('Nova resposta')

})