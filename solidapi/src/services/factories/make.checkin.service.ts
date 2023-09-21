import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository"
import { CheckinService } from "../checkin/checkin.service"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma.checkins.repository"

export function makeCheckinService() {
  const prismaCheckinRepository = new PrismaCheckinRepository()
  const prismaGymsRepository = new PrismaGymRepository()
  const makeCheckinService = new CheckinService(prismaCheckinRepository,prismaGymsRepository)
  return makeCheckinService
}