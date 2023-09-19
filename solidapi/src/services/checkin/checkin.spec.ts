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
      id: 'gym-id-01',
      title: 'Js Gym',
      description: 'To learn and growth' ,
      phone: '944502819',
      latitude: new Decimal(-23.7142825),
      longitude:  new Decimal(-46.5993207),
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
      userLatitude: -23.7141253,
      userLongitude: -46.5992241
    })
    
      expect(checkin.id).toEqual(expect.any(String))
   })

   it('not should be able to check-in twice in same day', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: -23.7141253,
      userLongitude: -46.5992241
    })
    
     expect(async () =>  await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: -23.7141253,
      userLongitude: -46.5992241
    })).rejects.toBeInstanceOf(Error)


   })

   it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))
    await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: -23.7141253,
      userLongitude: -46.5992241
    })
    

    vi.setSystemTime(new Date(2023,0,21,8,0,0))

    const { checkin} = await sut.handler({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: -23.7141253,
      userLongitude: -46.5992241
    })
    
    
    expect(checkin.id).toEqual(expect.any(String))

   })

   it('not should be able to check-in in distance gym', async () => {
    vi.setSystemTime(new Date(2023,0,20,8,0,0))

    inMemoryGymRepository.database.push({
      id: '2',
      title: 'Js Gym',
      description: 'To learn and growth' ,
      phone: '944502819',
      latitude: new Decimal(23.7106253),
      longitude:  new Decimal(46.6126251),
    })


    
    expect(async () => await sut.handler({
      gymId: '2',
      userId: 'user-id-01',
      userLatitude: 23.7269321,
      userLongitude: 23.7269321
    })).rejects.toBeInstanceOf(Error)
   })




})