import { NotificationRepository } from '@/domain/application/repositories/notification-repository'
import { Notification } from '@/domain/enterprise/entities/notification'
import { env } from '@/infra/env'
import { NotificationMapper } from '../mappers/notification-mapper'
import { MongoConnection } from '../mongo-connection'

export class MongoNotificationRepository implements NotificationRepository {
  constructor(private mongoConnection: MongoConnection) {}

  async sendNotification(notification: Notification): Promise<Notification> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'messages',
    )

    const notificationPersistence =
      NotificationMapper.toPersistence(notification)

    const notificationCreated = await collection.insertOne(
      notificationPersistence,
    )

    return NotificationMapper.toDomain(notificationCreated)
  }

  async getNotificationsByClientId(
    clientId: string,
    params: { page: number; limit: number },
  ): Promise<Notification[]> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'messages',
    )

    const query = {
      clientId,
    }

    const options = {
      limit: params.limit,
      skip: params.limit * params.page,
    }

    return (await collection.find(query, options).toArray()).map(
      NotificationMapper.toDomain,
    )
  }
}
