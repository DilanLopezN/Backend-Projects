import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckinService } from '@/services/factories/make.checkin.service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string().uuid()
  })
  const createCheckinBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = createCheckinBodySchema.parse(request.body)
  const { gymId } = createCheckinParamsSchema.parse(request.params)

  const createCheckinService = makeCheckinService()

  await createCheckinService.handler({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  reply.status(201).send('Checkin created successfully')
}
