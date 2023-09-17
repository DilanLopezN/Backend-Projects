import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository"
import { AuthenticateService } from "@/services/authenticate/authenticate.service"
import { InvalidCredentialsError } from "@/services/errors/user.invalid.credentials"
import { makeAuthenticateService } from "@/services/factories/make.authenticate.service"


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
  
    try {
      const {email, password} = authenticateBodySchema.parse(request.body)

      const authenticateService = makeAuthenticateService()
      
      await authenticateService.handler({email, password})
      reply.status(200).send()

    } catch (error) {
      if(error instanceof InvalidCredentialsError) {
        reply.status(409).send({message: error.message})
      }
      throw error
    }
    
    
}