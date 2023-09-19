import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../checkins.repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckinsRepository implements CheckInsRepository {

  public database: Checkin[] = []

  async findByUserIdOnDate(userId: string, date: Date){
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');


    const checkinOnSameDate = this.database.find(checkin => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if(!checkinOnSameDate){
      return null;
    }

    return checkinOnSameDate;
}

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = {
     id: randomUUID(),
     user_id: data.user_id,
     gym_id: data.gym_id,
     created_at: new Date(),
     validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.database.push(checkin);

    return checkin
  }

  async findManyByUserId(userId: string, page: number){
    return this.database.filter((checkin) => checkin.user_id === userId).slice((page - 1) * 20, page * 20)
  }

}