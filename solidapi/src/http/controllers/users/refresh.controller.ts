import { FastifyReply, FastifyRequest } from "fastify"


export async function refresh(request: FastifyRequest, reply: FastifyReply) {


  await request.jwtVerify({onlyCookie: true})


  const { role } = request.user

      const token =  await reply.jwtSign({
        role
      }, {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d'
        }
      })

      const refreshToken = await reply.jwtSign({
        role
      }, {
        sign: {
          sub: request.user.sub
        }
      })

      reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      }).send({token}).status(200)

    
    
}