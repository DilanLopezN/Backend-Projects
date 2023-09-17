import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/services/errors/user.already.exists"
import { makeRegisterService } from "@/services/factories/make.register.service"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
  
    try {
      const {email, name, password} = registerBodySchema.parse(request.body)

      const registerService = makeRegisterService()
      
      await registerService.handler({email, name, password})
      reply.status(201).send("Successfully registered")

    } catch (error) {
      if(error instanceof UserAlreadyExistsError) {
        reply.status(409).send({message: error.message})
      }
      throw error
    }
    
    
}