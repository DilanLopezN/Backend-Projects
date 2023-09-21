import { FetchNearbyGymsService } from "../gyms/fetch.nearby.gyms.service"
import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository"

export function makeSearchNearbyGymService() {
  const prismaGymRepository = new PrismaGymRepository()
  const useService = new FetchNearbyGymsService(prismaGymRepository)
  return useService
}