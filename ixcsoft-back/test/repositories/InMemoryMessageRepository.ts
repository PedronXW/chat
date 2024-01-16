import { MessageRepository } from '@/domain/application/repositories/message-repository'
import { Message } from '@/domain/enterprise/entities/message'
import { MessageMapper } from '@/infra/database/mappers/message-mapper'

type MessagePersistenceType = {
  id: string
  creatorId: string
  text: string
  createdAt: Date | null
  updatedAt?: Date | null
}

export class InMemoryMessageRepository implements MessageRepository {
  messages: MessagePersistenceType[] = []

  async createMessage(message: Message): Promise<Message> {
    this.messages.push(MessageMapper.toPersistence(message))

    return message
  }

  async getMessages(query: { page: number; limit: number }): Promise<{
    messages: Message[]
    count: number
  }> {
    const messages = this.messages

    const page = query.page || 1
    const limit = query.limit || 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const resultMessages = messages.slice(startIndex, endIndex)

    return {
      messages: resultMessages.map(MessageMapper.toDomain),
      count: messages.length,
    }
  }
}
