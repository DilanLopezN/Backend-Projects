import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository"
import { UsersRepository } from "@/repositories/user.repository"
import { hash } from "bcryptjs"

interface RegisterParamsProps {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async handler({email,name,password}: RegisterParamsProps) {
    const password_hash = await hash(password, 6)
    

  const userAlredyExists = await this.usersRepository.findByEmail(email)

    if(userAlredyExists) {
     throw new UserAlreadyExists()
    }


  await this.usersRepository.create(
   { name,
    email,
    password_hash}
  )
  }
}
