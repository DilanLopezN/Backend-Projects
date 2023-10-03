import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify.jwt";
import { create } from "./create.checkin.controller";
import { validate } from "./validate.checkin.controller";
import { history } from "./history.checkin.controller";
import { metrics } from "./metrics.checkin.controller";


export async function checkinRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/checkins/history', history)
  app.get('/checkins/metrics', metrics)
  app.post('/gyms/:gymId/checkins', create)
  app.patch('/checkins/:checkinId/validate', validate)

}