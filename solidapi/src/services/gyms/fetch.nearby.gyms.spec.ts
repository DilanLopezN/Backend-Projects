import { describe, it, expect, beforeEach} from 'vitest'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository'
import { FetchNearbyGymsService } from './fetch.nearby.gyms.service'


let inMemoryGymRepository: InMemorGymsRepository
let sut: FetchNearbyGymsService
describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemorGymsRepository()
     sut = new FetchNearbyGymsService(inMemoryGymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
      await inMemoryGymRepository.create({
        title: 'Js Gym',
        description: 'Growth Brain',
        phone: '40404040',
        latitude: -23.7142825,
        longitude:  -46.5993207,
      })

      
      await inMemoryGymRepository.create({
        title: 'Ts Gym',
        description: 'Growth Brain',
        phone: '40404040',
        latitude: -20.9739732,
        longitude: -45.4322623,
      })

  
  
    const {gyms} = await sut.handler({
      latitude: -23.7141253,
      longitude: -46.5992241
    })
    
      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
        expect.objectContaining({title: 'Js Gym',}),
      ])
   })




})