import { describe, it, expect, beforeEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'
import { CheckinService } from './checkin.service'

let inMemoryRepository: InMemoryCheckinsRepository
let sut: CheckinService
describe('Checkin Service', () => {
  beforeEach(() => {
     inMemoryRepository = new InMemoryCheckinsRepository()
     sut = new CheckinService(inMemoryRepository)
  })

  it('should be able to check in', async () => {

    const {checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    
      expect(checkin.id).toEqual(expect.any(String))
   })


})