import { expect, test} from 'vitest'
import { AnswerQuestion } from './answer-question'
import { Answer } from '../../entreprise/entities/answer'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestion } from './create-question'
import { Question } from '../../entreprise/entities/question'


const fakeQuestionRepository: QuestionRepository = {
    create: async (question: Question) => {}
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestion(fakeQuestionRepository)

  const {question} = await createQuestion.execute(
    {
      authorId: '1',
      title: 'Fon',
      content: 'Nova resposta',
    }
)

expect(question.content).toEqual('Nova resposta')
expect(question.authorId).toBeTruthy()

})