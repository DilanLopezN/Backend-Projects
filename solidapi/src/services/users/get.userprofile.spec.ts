import { describe, it, expect, beforeEach} from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory.users.repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get.user.service'
import { ResourceNotFoundError } from '../errors/resource.not.found'

let inMemoryRepository: InMemoryUserRepository
let sut: GetUserProfileService
describe('Get user profile', () => {
  beforeEach(() => {
     inMemoryRepository = new InMemoryUserRepository()
     sut = new GetUserProfileService(inMemoryRepository)
  })
  it('should be able to get user profile', async () => {

  
   const createdUser = await inMemoryRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6)
    })

   const {user} = await sut.handler({
    userId: createdUser.id
   })
    
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile', async () => {

     expect(async () => await sut.handler({
      userId: 'inexistent id'
     })).rejects.toBeInstanceOf(ResourceNotFoundError)
   })


})