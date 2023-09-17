import { Checkin, Prisma, User } from "@prisma/client";
import { CheckInsRepository } from "../checkins.repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckinsRepository implements CheckInsRepository {

  public database: Checkin[] = []

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

}