import { describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'
import { CheckinService } from './checkin.service'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository'

import { FetchCheckinService } from './fetch.checkin.service'

let inMemoryCheckinRepository: InMemoryCheckinsRepository
let sut: FetchCheckinService
describe('Fetch Checkin Service', () => {
  beforeEach(async () => {
    inMemoryCheckinRepository = new InMemoryCheckinsRepository()
     sut = new FetchCheckinService(inMemoryCheckinRepository)
  })

  it('should be able to fetch check-in history', async () => {
      await inMemoryCheckinRepository.create({
        gym_id: `gym-1`,
        user_id: 'user-id-01'
      })

    
      await inMemoryCheckinRepository.create({
        gym_id: `gym-2`,
        user_id: 'user-id-01'
      })
  
    const {checkIns} = await sut.handler({
      userId: 'user-id-01',
      page: 1
    })
    
      expect(checkIns).toHaveLength(2)
      expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-1',}),
        expect.objectContaining({gym_id: 'gym-2',})
      ])
   })


  it('should be able to fetch check-in history paginated', async () => {

    for(let i = 1; i <= 22; i++) {
      await inMemoryCheckinRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-id-01'
      })
    }


    const {checkIns} = await sut.handler({
      userId: 'user-id-01',
      page: 2
    })
    
      expect(checkIns).toHaveLength(2)
      expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-21',}),
        expect.objectContaining({gym_id: 'gym-22',})
      ])
   })



})