import { makeGetUserProfileService } from "@/services/factories/make.userprofile.service"
import { FastifyReply, FastifyRequest } from "fastify"


export async function profile(request: FastifyRequest, reply: FastifyReply) {
try {

  const getUserProfile = makeGetUserProfileService()

  const {user} = await getUserProfile.handler({
    userId: request.user.sub
  })

  reply.send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
} catch (error) {
  reply.send(error)
}
  
}