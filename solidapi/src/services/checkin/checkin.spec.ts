import { describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory.checkins.repository'
import { CheckinService } from './checkin.service'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository'
import { Decimal } from '@prisma/client/runtime/library'

let inMemoryCheckinRepository: InMemoryCheckinsRepository
let inMemoryGymRepository: InMemorGymsRepository
let sut: CheckinService
describe('Checkin Service', () => {
  beforeEach(() => {
    inMemoryCheckinRepository = new InMemoryCheckinsRepository()
     inMemoryGymRepository = new InMemorGymsRepository()
     sut = new CheckinService( inMemoryCheckinRepository, inMemoryGymRepository)


     inMemoryGymRepository.database.push({
      id: '1',
      title: 'Js Gym',
      description: 'To learn and growth' ,
      phone: '944502819',
      latitude: new Decimal(0),
      longitude:  new Decimal(0),
    })

     vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {



    const {checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 0,
      userLongitude: 0
    })
    
      expect(checkin.id).toEqual(expect.any(String))
   })

   it('not should be able to check-in twice in same day', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 0,
      userLongitude: 0
    })
    
     expect(async () =>  await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 0,
      userLongitude: 0
    })).rejects.toBeInstanceOf(Error)


   })

   it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 0,
      userLongitude: 0
    })
    

    vi.setSystemTime(new Date(2023,0,21,8,0,0))

    const { checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 0,
      userLongitude: 0
    })
    
    
    expect(checkin.id).toEqual(expect.any(String))

   })




})