import { SearchGymService } from "../gyms/search.gyms.service"
import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository"

export function makeValidadeCheckinHistoryService() {
  const prismaGymRepository = new PrismaGymRepository()
  const useService = new SearchGymService(prismaGymRepository)
  return useService
}