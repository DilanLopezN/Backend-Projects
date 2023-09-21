import {  Gym, Prisma  } from "@prisma/client";

import { FindManyNearbyParams, GymsRepository } from "../gyms.repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get.distance.between.coordinates";

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
   

  async searchMany(query: string, page: number) {
    return this.database.filter((gym) => gym.title.includes(query))
    .slice((page - 1) * 20, page * 20)
   }

   async findManyNearby(params: FindManyNearbyParams) {
       return this.database.filter((gym) => {
        const distance = getDistanceBetweenCoordinates({
          latitude: params.latitude,
          longitude: params.longitude
        }, {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber()
        })

        return distance  < 10
       })
   }
   

}