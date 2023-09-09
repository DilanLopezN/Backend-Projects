import fastify from "fastify";
import { appRoutes } from "./http/http.routes";
export const app =  fastify()

app.register(appRoutes)
