import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource.not.found";
import { CheckInsRepository } from "@/repositories/checkins.repository";
import dayjs from "dayjs";
import { LateCheckinError } from "../errors/late.checkin.time";


interface ValidateCheckinRequest {
  checkinId: string;
}

interface ValidateCheckinResponse {
  checkin: Checkin
}

export class ValidateCheckinService {
  constructor(private checkinsRepository: CheckInsRepository,
) {}

  async handler({checkinId}: ValidateCheckinRequest ): Promise<ValidateCheckinResponse> {
    
    const checkin = await this.checkinsRepository.findById(checkinId)


    if(!checkin) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckinCreate = dayjs(new Date()).diff(checkin.created_at, 'minutes')

    if(distanceInMinutesFromCheckinCreate > 20) {
      throw new LateCheckinError()
    }

    checkin.validated_at = new Date()


    await this.checkinsRepository.save(checkin)

    return {
      checkin
    }
  }
}