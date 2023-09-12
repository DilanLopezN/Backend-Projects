import { UsersRepository } from "@/repositories/user.repository";
import { InvalidCredentialsError } from "../errors/user.invalid.credentials";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async handler({email, password}: AuthenticateServiceRequest ): Promise<AuthenticateServiceResponse> {
   const user = await this.userRepository.findByEmail(email)

   if(!user) {
    throw new InvalidCredentialsError()
   }

   const doesPasswordMatch = await compare(password, user.password_hash)

   if(!doesPasswordMatch) {
    throw new InvalidCredentialsError()
   }

   return {
    user
   }

  }
}