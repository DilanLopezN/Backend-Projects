import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckinService } from '@/services/factories/make.checkin.service'
import { makeValidadeCheckinHistoryService } from '@/services/factories/make.validate.checkin.service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkinId: z.string().uuid()
  })

  const { checkinId } = validateCheckinParamsSchema.parse(request.params)

  const validateCheckinService = makeValidadeCheckinHistoryService()

  await validateCheckinService.handler({
    checkinId
  })

  reply.status(204).send('Checkin validated')
}
