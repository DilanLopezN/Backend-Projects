import { describe, it, expect, beforeEach} from 'vitest'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository'
import { SearchGymService } from './search.gyms.service'


let inMemoryGymRepository: InMemorGymsRepository
let sut: SearchGymService
describe('Search Gyms Service', () => {
  beforeEach(async () => {
    inMemoryGymRepository = new InMemorGymsRepository()
     sut = new SearchGymService(inMemoryGymRepository)
  })

  it('should be able to search gyms', async () => {
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
        latitude: -23.7142825,
        longitude:  -46.5993207,
      })

  
  
    const {gyms} = await sut.handler({
      query: 'Js',
      page: 1
    })
    
      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
        expect.objectContaining({title: 'Js Gym',}),
      ])
   })


  it('should be able to fetch check-in history paginated', async () => {

    for(let i = 1; i <= 22; i++) {
      await inMemoryGymRepository.create({
        title: `Js Gym ${i}`,
        description: 'Growth Brain',
        phone: '40404040',
        latitude: -23.7142825,
        longitude:  -46.5993207,
      })
    }


    const {gyms} = await sut.handler({
      query: 'Js',
      page: 2
    })
    
      expect(gyms).toHaveLength(2)
      expect(gyms).toEqual([
        expect.objectContaining({title: 'Js Gym 21',}),
        expect.objectContaining({title: 'Js Gym 22',})
      ])
   })



})