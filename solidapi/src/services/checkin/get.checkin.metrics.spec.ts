import { describe, it, expect, beforeEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'


import { FetchCheckinService } from './fetch.checkin.service'
import { GetCheckinMetricsService } from './get.checkin.metrics.service'

let inMemoryCheckinRepository: InMemoryCheckinsRepository
let sut: GetCheckinMetricsService
describe('Get Checkin Metrics Service', () => {
  beforeEach(async () => {
    inMemoryCheckinRepository = new InMemoryCheckinsRepository()
     sut = new GetCheckinMetricsService(inMemoryCheckinRepository)
  })

  it('should be able to count check-in of user', async () => {
      await inMemoryCheckinRepository.create({
        gym_id: `gym-1`,
        user_id: 'user-id-01'
      })

    
      await inMemoryCheckinRepository.create({
        gym_id: `gym-2`,
        user_id: 'user-id-01'
      })
  
    const {checkinsCount} = await sut.handler({
      userId: 'user-id-01',
    })
    
      expect(checkinsCount).toEqual(2)
    
   })




})