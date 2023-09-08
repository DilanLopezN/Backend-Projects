import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  //mostrar logs apenas em ambiente de desenvolvimento
  log: env.NODE_ENV === 'dev' ? ['query'] : []
})