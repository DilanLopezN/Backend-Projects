import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository"
import { RegisterService } from "../register/register.service"

export function makeRegisterService() {
  const prismaUserRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(prismaUserRepository)
  return registerService
}