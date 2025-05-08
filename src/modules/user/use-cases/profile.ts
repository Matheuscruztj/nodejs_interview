import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { IUsersRepository } from "../repository/users.repository.interface";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const repository = container.resolve<IUsersRepository>('UsersRepository');
        const user = await repository.findById(request.user.sub);

        return reply.status(200).send({
            name: user?.name,
            email: user?.email,
            whatsapp_number: user?.whatsapp_number,
            instagram: user?.instagram,
            birth_date: user?.birth_date,
        })
    } catch (error) {
        return reply.status(500).send({
            message: 'Error on profile user'
        })
    }
}