import { Message } from '@/domain/enterprise/entities/message'
import { PaginationType } from './utils/pagination-type'

export abstract class MessageRepository {
  abstract createMessage(message: Message): Promise<Message>

  abstract getMessages(query: PaginationType): Promise<{
    messages: Message[]
    count: number
  }>
}
