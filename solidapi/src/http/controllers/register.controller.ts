import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { registerService } from "../../services/register.service"


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
  
    try {
      const {email, name, password} = registerBodySchema.parse(request.body)

      await registerService({email, name, password})
      reply.status(201).send("Successfully registered")

    } catch (error) {
      reply.status(409).send()
    }
    
    
}