import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository"
import { GetUserProfileService } from "../users/get.user.service"

export function makeGetUserProfileService() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useService = new GetUserProfileService(prismaUserRepository)
  return useService
}