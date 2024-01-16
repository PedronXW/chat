import { FetchNotificationByClientService } from '@/domain/application/services/notification/fetch-notification-by-client'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoNotificationRepository } from '@/infra/database/repositories/MongoNotificationRepository'

const mongoConnection = new MongoConnection()
const notificationRepository = new MongoNotificationRepository(mongoConnection)
const fetchNotificationByClientService = new FetchNotificationByClientService(
  notificationRepository,
)

export { fetchNotificationByClientService }
