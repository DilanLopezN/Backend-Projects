import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../checkins.repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";


export class PrismaCheckinRepository implements CheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = await prisma.checkin.create({
      data: data
    })

    return checkIn
  }
 async save(data: Checkin) {
    const checkIn = await prisma.checkin.update({
      where: {id: data.id}, data: data
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkin.findUnique({
      where: { id}
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');
    

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    
    return checkIn

  }
  async findManyByUserId(userId: string, page: number) {
      const checkIns = await prisma.checkin.findMany({
        where: {user_id: userId}, skip: 20, take: (page  - 1) * 20
      })

      return checkIns
  }


  async countByUserId(userId: string) {
   const count = await prisma.checkin.count({
    where: {user_id: userId}
   })
   return count

  }

}