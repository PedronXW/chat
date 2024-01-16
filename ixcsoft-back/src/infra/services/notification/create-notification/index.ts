import { CreateNotificationService } from '@/domain/application/services/notification/create-notification'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoNotificationRepository } from '@/infra/database/repositories/MongoNotificationRepository'

const mongoConnection = new MongoConnection()
const notificationRepository = new MongoNotificationRepository(mongoConnection)
const createNotificationService = new CreateNotificationService(
  notificationRepository,
)

export { createNotificationService }
