import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../user.repository";

export class InMemoryUserRepository implements UsersRepository {

  public database: User[] = []




  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.database.push(user);

    return user
  }
  async findByEmail(email: string) {
    const user = this.database.find((user => user.email === email))

    if(!user) {
      return null
    }

    return user
  
  }


  async findById(userId: string) {
    const user = this.database.find((user => user.id === userId))

    if(!user) {
      return null
    }

    return user
  
  }

}