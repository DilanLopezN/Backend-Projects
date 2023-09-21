import { PrismaCheckinRepository } from "@/repositories/prisma/prisma.checkins.repository"
import { ValidateCheckinService } from "../checkin/validate.checkin.service"

export function makeValidadeCheckinHistoryService() {
  const prismCheckinRepository = new PrismaCheckinRepository()
  const useService = new ValidateCheckinService(prismCheckinRepository)
  return useService
}