import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource.not.found";
import { CheckInsRepository } from "@/repositories/checkins.repository";
import { GymsRepository } from "@/repositories/gyms.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get.distance.between.coordinates";


interface CheckinRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinResponse {
  checkin: Checkin
}

export class CheckinService {
  constructor(private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository) {}

  async handler({userId, gymId, userLatitude, userLongitude}: CheckinRequest ): Promise<CheckinResponse> {
    
    const gym = await this.gymsRepository.findById(gymId)


    if(!gym) {
      throw new ResourceNotFoundError()
    }


    const distance = getDistanceBetweenCoordinates({
      latitude: userLatitude,
      longitude: userLongitude
    }, {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber()
    })

    const MAX_DISTANCE = 0.1

    if(distance > MAX_DISTANCE) {
      throw new Error()
    }

    const checkinOnSameDate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date());

    if(checkinOnSameDate) {
      throw new Error()
    }

    const checkin = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkin
    }
  }
}