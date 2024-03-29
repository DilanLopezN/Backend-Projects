import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify.jwt";
import { search } from "./search.gym.controller";
import { nearby } from "./nearby.gym.controller";
import { create } from "./create.gym.controller";
import { verifyUserRole } from "@/http/middlewares/verify.user.role";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)


  app.get('/gym/search', search)
  app.get('/gym/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)

}