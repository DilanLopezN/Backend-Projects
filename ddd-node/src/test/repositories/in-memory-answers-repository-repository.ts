import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository"
import { Answer } from "@/domain/forum/entreprise/entities/answer";
export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = [];


  
  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    this.items[itemIndex] = answer
  }


 async  findById(id: string) {
    const answer =  this.items.find(item => item.id.toString() === id);

    if(!answer) {
     return null;
    }
 
    return answer
  }

  async findManyByQuestionId(questionId: string, {page}: PaginationParams) {
    const answers = this.items
    .filter(item => item.questionId.toString() === questionId)
    .slice((page - 1) * 20, page * 20)

    return answers
}


  async delete(answer: Answer){
    const itemIndex = this.items.findIndex(item => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }


  async create(answer: Answer){
      this.items.push(answer);
  }

}