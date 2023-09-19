import {  Gym, Prisma  } from "@prisma/client";

import { GymsRepository } from "../gyms.repository";
import { randomUUID } from "crypto";

export class InMemorGymsRepository implements GymsRepository {

  public database: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString())
    }

    this.database.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym =  this.database.find(gym => gym.id === gymId);

 
      if(!gym) {
        return null
      }

    return gym
   }
   

}