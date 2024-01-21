import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../repositories/question-repository";
import { QuestionComment } from "../../entreprise/entities/question-comment";
import { QuestionsCommentRepository } from "../repositories/question-comment-repository";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
constructor(
  private questionsRepository: QuestionRepository,
  private questionCommentRepository: QuestionsCommentRepository
  
  ) {}

async execute({
  authorId,
  questionId,
  content
}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

  const question = await this.questionsRepository.findById(questionId)

  if(!question) {
    throw new Error('Question not found')
  }

  const questionComment = QuestionComment.create({
    authorId: new UniqueEntityId(authorId),
    questionId: new UniqueEntityId(questionId),
    content:  content
  })
  
  await this.questionCommentRepository.create(questionComment)
  

  return {
    questionComment
  }
 
}
}