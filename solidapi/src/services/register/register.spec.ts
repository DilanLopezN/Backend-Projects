import { describe, it, expect} from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory.users.repository'
import { UserAlreadyExistsError } from '../errors/user.already.exists'

describe('Register Service', () => {

  it('should be able to register', async () => {

    const inMemoryRepository = new InMemoryUserRepository()
    const registerService = new RegisterService(inMemoryRepository)

   const {user} = await registerService.handler({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    

    expect(user.id).toEqual(expect.any(String))
  })


  it('should hash user password upon registration', async () => {

    const inMemoryRepository = new InMemoryUserRepository()
    const registerService = new RegisterService(inMemoryRepository)

   const {user} = await registerService.handler({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const passwordIsHashed = await compare('123456',user.password_hash)

    expect(passwordIsHashed).toBe(true)
  })

  it('should not be able create an user with same email', async () => {

    const inMemoryRepository = new InMemoryUserRepository()
    const registerService = new RegisterService(inMemoryRepository)

    const email = 'john@gmail.com'


    await registerService.handler({
      name: 'John Doe',
      email,
      password: '123456'
    })

   
    expect(async () =>  await registerService.handler({
      name: 'John Doe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    
  })

  
})