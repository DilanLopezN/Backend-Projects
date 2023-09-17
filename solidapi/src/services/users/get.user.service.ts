import { UsersRepository } from "@/repositories/user.repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource.not.found";


interface AuthenticateServiceRequest {
  userId: string;
}

interface AuthenticateServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: UsersRepository) {}

  async handler({userId}: AuthenticateServiceRequest ): Promise<AuthenticateServiceResponse> {
   const user = await this.userRepository.findById(userId)

   if(!user) {
    throw new ResourceNotFoundError()
   }

   return {
    user
   }

  }
}