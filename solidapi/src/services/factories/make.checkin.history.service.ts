import { FetchCheckinService } from "../checkin/fetch.checkin.service"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma.checkins.repository"

export function makeFetchUserCheckinHistoryService() {
  const prismCheckinRepository = new PrismaCheckinRepository()
  const useService = new FetchCheckinService(prismCheckinRepository)
  return useService
}