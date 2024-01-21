import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-questions-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'



let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionsCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase
describe('Comment on Question', () => {

  beforeEach(() => {
  inMemoryQuestionsCommentRepository = new InMemoryQuestionCommentRepository()
  inMemoryQuestionRepository = new InMemoryQuestionsRepository()
  sut = new CommentOnQuestionUseCase(
    inMemoryQuestionRepository,
    inMemoryQuestionsCommentRepository
    )
  })


  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comment test'
    })


    expect(inMemoryQuestionsCommentRepository.items[0].content)
    .toEqual('Comment test')

  })



})

