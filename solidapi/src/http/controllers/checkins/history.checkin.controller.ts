import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchUserCheckinHistoryService } from "@/services/factories/make.checkin.history.service"


export async function history(request: FastifyRequest, reply: FastifyReply) {
    const historyCheckinParams = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1)
    })
  

      const { page} = historyCheckinParams.parse(request.query)

      const historyGymService =  makeFetchUserCheckinHistoryService()
      
      const  {checkIns}  = await historyGymService.handler({page, userId: request.user.sub})
      reply.status(200).send({checkIns})


}