import {  Gym  } from "@prisma/client";

import { GymsRepository } from "../gyms.repository";

export class InMemorGymsRepository implements GymsRepository {

  public database: Gym[] = []

  async findById(gymId: string) {
    const gym =  this.database.find(gym => gym.id === gymId);

 
      if(!gym) {
        return null
      }

    return gym
   }

}