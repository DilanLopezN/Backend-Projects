import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma.users.repository"
import { hash } from "bcryptjs"

interface RegisterParamsProps {
  name: string
  email: string
  password: string
}
export async function registerService({email,name,password}: RegisterParamsProps) {
  const password_hash = await hash(password, 6)
      const userAlredyExists = await prisma.user.findUnique({where: {email}})

      if(userAlredyExists) {
       throw new Error("User already exists")
      }

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create(
     { name,
      email,
      password_hash}
    )
    
}