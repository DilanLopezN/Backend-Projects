import { describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'
import { ValidateCheckinService } from './validate.checkin.service'
import { ResourceNotFoundError } from '../errors/resource.not.found'
import { LateCheckinError } from '../errors/late.checkin.time'

let inMemoryCheckinRepository: InMemoryCheckinsRepository
let sut: ValidateCheckinService
describe('Validate Checkin Service', () => {
  beforeEach(async () => {
    inMemoryCheckinRepository = new InMemoryCheckinsRepository()
     sut = new ValidateCheckinService(inMemoryCheckinRepository)
     vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {

    const createdCheckIn = await inMemoryCheckinRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    }) 

    const {checkin} = await sut.handler({
      checkinId: createdCheckIn.id
    })
    
      expect(checkin.validated_at).toEqual(expect.any(Date))
      expect(inMemoryCheckinRepository.database[0].validated_at).toEqual(expect.any(Date))
   })

   it('not should be able to validate inexistent check-in', async () => {
    
      expect(async () => await sut.handler({
        checkinId: 'inexistend-id-01'
      })).rejects.toBeInstanceOf(ResourceNotFoundError)
    
   })

   it('not should be able to validate check-in after 20 minutes', async () => {
      vi.setSystemTime(new Date(2023,0,1,13,40)) // utc-time
      
      const createdCheckIn = await inMemoryCheckinRepository.create({
        gym_id: 'gym-id-01',
        user_id: 'user-id-01',
      }) 

      const twentyOneMinutesInMs = 1000 * 60 * 21 // 21 minutos em millisegundos
      
      vi.advanceTimersByTime(twentyOneMinutesInMs) 
  
  
      
        expect(async () => await sut.handler({
          checkinId: createdCheckIn.id
        })).rejects.toBeInstanceOf(LateCheckinError)
 })


})