import { makeQuestion } from '@/test/factories/make-question'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository-repository'
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answers-commen-repositoryt'
import { CommentAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '@/test/factories/make-answer'



let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentAnswerUseCase
describe('Comment on Answer', () => {

  beforeEach(() => {
  inMemoryAnswersCommentRepository = new InMemoryAnswerCommentRepository()
  inMemoryAnswerRepository = new InMemoryAnswersRepository()
  sut = new CommentAnswerUseCase(
    inMemoryAnswerRepository,
    inMemoryAnswersCommentRepository
    )
  })


  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comment test'
    })


    expect(inMemoryAnswersCommentRepository.items[0].content)
    .toEqual('Comment test')

  })



})

