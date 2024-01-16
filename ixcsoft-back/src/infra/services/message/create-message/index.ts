import { CreateMessageService } from '@/domain/application/services/message/create-message'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoMessageRepository } from '@/infra/database/repositories/MongoMessageRepository'

const mongoConnection = new MongoConnection()
const messageRepository = new MongoMessageRepository(mongoConnection)
const createMessageService = new CreateMessageService(messageRepository)

export { createMessageService }
