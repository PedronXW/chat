import { Either, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Message } from '@/domain/enterprise/entities/message'
import { MessageRepository } from '../../repositories/message-repository'

interface CreateClientServiceRequest {
  text: string
  creatorName: string
  creatorId: string
}

type CreateClientServiceResponse = Either<null, Message>

export class CreateMessageService {
  constructor(private messageRepository: MessageRepository) {}

  async execute({
    text,
    creatorName,
    creatorId,
  }: CreateClientServiceRequest): Promise<CreateClientServiceResponse> {
    const message = Message.create({
      text,
      creatorName,
      creatorId: new EntityId(creatorId),
    })

    return right(await this.messageRepository.createMessage(message))
  }
}
