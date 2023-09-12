import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterService } from "../../services/register.service"
import { PrismaUsersRepository } from "@/repositories/prisma.users.repository"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
  
    try {
      const {email, name, password} = registerBodySchema.parse(request.body)

      const prismaUserRepository = new PrismaUsersRepository()
      const registerService = new RegisterService(prismaUserRepository)
      
      await registerService.handler({email, name, password})
      reply.status(201).send("Successfully registered")

    } catch (error) {
      reply.status(409).send()
    }
    
    
}