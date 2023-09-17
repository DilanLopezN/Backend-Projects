import { describe, it, expect, beforeEach} from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory.users.repository'
import { AuthenticateService } from './authenticate.service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/user.invalid.credentials'


let inMemoryRepository: InMemoryUserRepository
let sut: AuthenticateService
describe('Authenticate Service', () => {
  beforeEach(() => {
     inMemoryRepository = new InMemoryUserRepository()
     sut = new AuthenticateService(inMemoryRepository)
  })
  it('should be able to authenticate', async () => {

  
    await inMemoryRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6)
    })

   const {user} = await sut.handler({
    email: 'johndoe@gmail.com',
    password: '123456'
   })
    

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {

  

   expect(async () =>  await sut.handler({
    email: 'johndoe@gmail.com',
    password: '123456'
  })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })


  it('should not be able to authenticate with wrong password', async () => {

 

    await inMemoryRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6)
    })

   expect(async () =>  await sut.handler({
    email: 'johndoe@gmail.com',
    password: '154456'
  })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })



})