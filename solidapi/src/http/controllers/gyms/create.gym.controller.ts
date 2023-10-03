import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeGymService } from "@/services/factories/make.gym.service"


export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine(value => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
      }),
    })
  

      const {title, description, phone,latitude,longitude} = createGymBodySchema.parse(request.body)

      const createGymService = makeGymService()
      
      await createGymService.handler({title,description,phone,latitude,longitude})
      reply.status(201).send("Gym created successfully")


}