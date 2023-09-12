import { UsersRepository } from "@/repositories/user.repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user.already.exists"

interface RegisterParamsProps {
  name: string
  email: string
  password: string
}
interface RegisterServiceResponse {
  user: User
}
export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async handler({email,name,password}: RegisterParamsProps): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)
    

  const userAlredyExists = await this.usersRepository.findByEmail(email)

    if(userAlredyExists) {
     throw new UserAlreadyExists()
    }


 const user = await this.usersRepository.create(
   { name,
    email,
    password_hash}
  )

  return {
    user
  }
  }
}
