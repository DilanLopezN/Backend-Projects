import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeSearchNearbyGymService } from "@/services/factories/make.gym.nearby.service"


export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsSearch = z.object({
      latitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 180
      }),
    })
  

      const {latitude, longitude} = nearbyGymsSearch.parse(request.query)

      const createGymService =  makeSearchNearbyGymService()
      
      const  {gyms}  = await createGymService.handler({latitude, longitude})
      reply.status(200).send({gyms})


}