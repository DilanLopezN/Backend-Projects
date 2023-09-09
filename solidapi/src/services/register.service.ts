import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterParamsProps {
  name: string
  email: string
  password: string
}
export async function registerService({email,name,password}: RegisterParamsProps) {
  const hashed_password = await hash(password, 6)
      const userAlredyExists = await prisma.user.findUnique({where: {email}})

      if(userAlredyExists) {
       throw new Error("User already exists")
      }

      await prisma.user.create({
        data: {
          email,
          name,
          password_hash: hashed_password
        }
      })
    
}