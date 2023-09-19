import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms.repository"

interface GymsRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface GymsResponse {
  gym: Gym 
}
export class GymService {
  constructor(private gymsRepository: GymsRepository) {}
  async handler({title,description,phone,latitude,longitude}: GymsRequest): Promise<GymsResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description: description ?? '',
      phone: phone ?? '',
      latitude,
      longitude,
      
    })



      return {gym}
  }
}
