import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoClientRepository } from '@/infra/database/repositories/MongoClientRepository'
import { env } from '@/infra/env'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../http/errors/AppError'

interface IPayload {
  sub: string
}

export async function verifySocketAuthentication(socket, next) {
  const authHeader = socket.handshake.headers.authorization

  if (!authHeader) {
    const err = new Error('not authorized')
    next(err)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: id } = verify(token, env.JWT_SECRET) as IPayload
    const mongoConnection = new MongoConnection()
    const developersRepository = new MongoClientRepository(mongoConnection)
    const user = await developersRepository.getClientById(id)

    if (!user) {
      throw new AppError('User does not exists', 401)
    }

    socket.handshake.headers = {
      ...socket.handshake.headers,
      user: user.id.getValue(),
    }

    next()
  } catch (error) {
    const err = new Error('not authorized')
    next(err)
  }
}
