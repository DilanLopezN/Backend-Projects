import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeSearchGymService } from "@/services/factories/make.search.gym.service"


export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchQueryParams = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1)
    })
  

      const {query, page} = searchQueryParams.parse(request.query)

      const createGymService =  makeSearchGymService()
      
      const  {gyms}  = await createGymService.handler({page, query})
      reply.status(200).send({gyms})


}