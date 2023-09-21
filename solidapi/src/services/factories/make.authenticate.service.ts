import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository"
import { AuthenticateService } from "../authenticate/authenticate.service"

export function makeAuthenticateService() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useService = new AuthenticateService(prismaUserRepository)
  return useService
}