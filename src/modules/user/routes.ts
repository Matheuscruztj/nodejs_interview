import { verifyJwt } from "@shared/infra/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./use-cases/register"
import { profile } from "./use-cases/profile"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.get('/me', { onRequest: [verifyJwt] }, profile)
  }
  