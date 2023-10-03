import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeGetUserMetricsService } from "@/services/factories/make.usermetrics.service"


export async function metrics(request: FastifyRequest, reply: FastifyReply) {

      const metricsCheckinsService =  makeGetUserMetricsService()
      
      const  {checkinsCount}  = await metricsCheckinsService.handler({ userId: request.user.sub})
      reply.status(200).send({checkinsCount})


}