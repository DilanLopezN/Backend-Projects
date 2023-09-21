import { GetCheckinMetricsService } from "../checkin/get.checkin.metrics.service"
import { PrismaCheckinRepository } from "@/repositories/prisma/prisma.checkins.repository"

export function makeGetUserMetricsService() {
  const prismCheckinRepository = new PrismaCheckinRepository()
  const useService = new GetCheckinMetricsService(prismCheckinRepository)
  return useService
}