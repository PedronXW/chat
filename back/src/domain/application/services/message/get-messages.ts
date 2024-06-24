import { Either, right } from '@/@shared/either'
import { Message } from '@/domain/enterprise/entities/message'
import { MessageRepository } from '../../repositories/message-repository'
import { PaginationType } from '../../repositories/utils/pagination-type'
import { MessageNonExistsError } from '../errors/MessageNonExists'

type GetMessagesServiceRequest = {
  query: PaginationType
}

type GetMessagesServiceResponse = Either<
  MessageNonExistsError,
  {
    messages: Message[]
    count: number
  }
>

export class GetMessagesService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    query,
  }: GetMessagesServiceRequest): Promise<GetMessagesServiceResponse> {
    const message = await this.messageRepository.getMessages(query)

    return right(message)
  }
}
