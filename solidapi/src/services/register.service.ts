import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma.users.repository"
import { hash } from "bcryptjs"

interface RegisterParamsProps {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: any) {}
  async handler({email,name,password}: RegisterParamsProps) {
    const password_hash = await hash(password, 6)
    const userAlredyExists = await prisma.user.findUnique({where: {email}})

    if(userAlredyExists) {
     throw new Error("User already exists")
    }


  await this.usersRepository.create(
   { name,
    email,
    password_hash}
  )
  }
}
