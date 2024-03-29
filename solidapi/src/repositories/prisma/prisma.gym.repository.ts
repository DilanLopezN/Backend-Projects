import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms.repository";
import { prisma } from "@/lib/prisma";


export class PrismaGymRepository implements GymsRepository {
 async findById(gymId: string) {
   const gym = await prisma.gym.findUnique({
    where: {id: gymId},
   })

   return gym
  }
 async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data: data
    })

    return gym
  }
async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {title: {contains: query}},skip: 20, take: (page - 1) * 20 
    })

    return gyms
  }
 async findManyNearby({latitude, longitude}: FindManyNearbyParams){
      const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      `

      return gyms
  }

}