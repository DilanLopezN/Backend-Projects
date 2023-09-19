import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/checkins.repository";

interface GetCheckinMetricsRequest {
  userId: string;
}

interface GetCheckinMetricsResponse {
  checkinsCount: number;
}

export class GetCheckinMetricsService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async handler({userId}: GetCheckinMetricsRequest ): Promise<GetCheckinMetricsResponse> {
    
    const checkinsCount = await this.checkinsRepository.countByUserId(userId);

    return {
      checkinsCount
    }
  }
}