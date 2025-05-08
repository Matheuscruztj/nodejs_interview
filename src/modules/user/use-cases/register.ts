import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { z } from 'zod'
import { IUsersRepository } from "../repository/users.repository.interface";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp_number: z.string(),
    instagram: z.string(),
    birth_date: z.string(),
    password: z.string().min(6),
  })

  const { email } = registerBodySchema.parse(request.body)

  try {
    const repository = container.resolve<IUsersRepository>('UsersRepository');
    const user = await repository.findByEmail(email);

    const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: String(user.id),
          },
        },
    )
  
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: String(user.id),
          expiresIn: '1d',
        },
      },
    )
    
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    return reply.status(500).send({
      message: 'Error on register user',
    })
  }
}