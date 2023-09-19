import { describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'
import { CheckinService } from './checkin.service'

let inMemoryRepository: InMemoryCheckinsRepository
let sut: CheckinService
describe('Checkin Service', () => {
  beforeEach(() => {
     inMemoryRepository = new InMemoryCheckinsRepository()
     sut = new CheckinService(inMemoryRepository)

     vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {

    const {checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    
      expect(checkin.id).toEqual(expect.any(String))
   })

   it('not should be able to check-in twice in same day', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    
     expect(async () =>  await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })).rejects.toBeInstanceOf(Error)


   })

   it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    

    vi.setSystemTime(new Date(2023,0,21,8,0,0))

    const { checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    
    
    expect(checkin.id).toEqual(expect.any(String))

   })




})