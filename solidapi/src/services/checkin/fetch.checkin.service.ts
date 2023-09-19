import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/checkins.repository";

interface FetchCheckinRequest {
  userId: string;
  page: number;
}

interface FetchCheckinResponse {
  checkIns: Checkin[]
}

export class FetchCheckinService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async handler({userId, page}: FetchCheckinRequest ): Promise<FetchCheckinResponse> {
    
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page);

    return {
      checkIns
    }
  }
}