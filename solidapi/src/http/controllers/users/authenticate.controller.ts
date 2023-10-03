import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
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
      
      const {user} = await authenticateService.handler({email, password})

      const token =  await reply.jwtSign({}, {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        }
      })

      const refreshToken = await reply.jwtSign({}, {
        sign: {
          sub: user.id
        }
      })

      reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      }).send({token}).status(200)

    } catch (error) {
      if(error instanceof InvalidCredentialsError) {
        reply.status(409).send({message: error.message})
      }
      throw error
    }
    
    
}