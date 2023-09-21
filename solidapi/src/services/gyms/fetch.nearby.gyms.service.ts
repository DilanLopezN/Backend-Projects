import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms.repository"

interface FetchNearbyGymsRequest {
  latitude: number;
  longitude: number;
}
interface FetchNearbyGymsResponse {
  gyms: Gym []
}
export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}
  async handler({latitude, longitude}: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
   
    const gyms = await this.gymsRepository.findManyNearby({
      latitude,
      longitude
    })


      return {gyms}
  }
}
