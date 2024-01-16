import { EntityId } from '@/@shared/entities/entity-id'
import { Message } from '@/domain/enterprise/entities/message'

export function makeMessage(override: Partial<Message> = {}, id?: EntityId) {
  const message = Message.create(
    {
      creatorId: new EntityId('any_id'),
      text: 'any_text',
      creatorName: 'any_name',
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return message
}
