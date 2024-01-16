import { GetMessagesService } from '@/domain/application/services/message/get-messages'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoMessageRepository } from '@/infra/database/repositories/MongoMessageRepository'

const mongoConnection = new MongoConnection()
const messageRepository = new MongoMessageRepository(mongoConnection)
const getMessagesService = new GetMessagesService(messageRepository)

export { getMessagesService }
