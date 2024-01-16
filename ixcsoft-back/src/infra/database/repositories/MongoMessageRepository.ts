import { MessageRepository } from '@/domain/application/repositories/message-repository'
import { PaginationType } from '@/domain/application/repositories/utils/pagination-type'
import { Message } from '@/domain/enterprise/entities/message'
import { env } from '@/infra/env'
import { MessageMapper } from '../mappers/message-mapper'
import { MongoConnection } from '../mongo-connection'

export class MongoMessageRepository implements MessageRepository {
  constructor(private mongoConnection: MongoConnection) {}

  async createMessage(message: Message): Promise<Message> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'messages',
    )

    await collection.insertOne(MessageMapper.toPersistence(message))

    return message
  }

  async getMessages({ page, limit }: PaginationType): Promise<{
    count: number
    messages: Message[]
  }> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'messages',
    )

    const options = {
      limit,
      skip: limit * page,
      sort: ['createdAt', 'desc'],
    }

    const count = await collection.countDocuments()

    const messages = (await collection.find({}, options).toArray()).map(
      MessageMapper.toDomain,
    )

    return {
      messages,
      count,
    }
  }
}
