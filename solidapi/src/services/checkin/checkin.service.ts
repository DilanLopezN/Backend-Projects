import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource.not.found";
import { CheckInsRepository } from "@/repositories/checkins.repository";


interface CheckinRequest {
  userId: string;
  gymId: string;
}

interface CheckinResponse {
  checkin: Checkin
}

export class CheckinService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async handler({userId, gymId}: CheckinRequest ): Promise<CheckinResponse> {
  
    const checkin = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return {
      checkin
    }
  }
}