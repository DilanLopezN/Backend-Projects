import { describe, it, expect, beforeEach} from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory.users.repository'
import { UserAlreadyExistsError } from '../errors/user.already.exists'


let userReposititory: InMemoryUserRepository
let sut: RegisterService
describe('Register Service', () => {
beforeEach(() => {
  userReposititory = new InMemoryUserRepository()
  sut = new RegisterService(userReposititory)
})
  it('should be able to register', async () => {

    
   const {user} = await sut.handler({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    

    expect(user.id).toEqual(expect.any(String))
  })


  it('should hash user password upon registration', async () => {

   const {user} = await sut.handler({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const passwordIsHashed = await compare('123456',user.password_hash)

    expect(passwordIsHashed).toBe(true)
  })

  it('should not be able create an user with same email', async () => {

  
    const email = 'john@gmail.com'


    await sut.handler({
      name: 'John Doe',
      email,
      password: '123456'
    })

   
    expect(async () =>  await sut.handler({
      name: 'John Doe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    
  })

  
})