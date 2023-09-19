import { describe, it, expect, beforeEach} from 'vitest'
import { GymService } from './gyms.service'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository'


let gymRepository: InMemorGymsRepository
let sut: GymService
describe('Gym Service', () => {
beforeEach(() => {
  gymRepository = new InMemorGymsRepository()
  sut = new GymService(gymRepository)
})
  it('should be able to create a gym', async () => {

   const {gym} = await sut.handler({
      title: 'Js Gym',
      description: 'Growth Brain',
      phone: '40404040',
      latitude: -23.7142825,
      longitude:  -46.5993207,
    })

    

    expect(gym.id).toEqual(expect.any(String))
  })

})