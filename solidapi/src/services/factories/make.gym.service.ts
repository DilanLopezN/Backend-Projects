import { GymService } from "../gyms/gyms.service"
import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository"

export function makeGymService() {
  const prismaGymRepository = new PrismaGymRepository()
  const useService = new GymService(prismaGymRepository)
  return useService
}