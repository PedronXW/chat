import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

export interface MessageProps {
  text: string
  creatorId: EntityId
  creatorName: string
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Message extends Entity<MessageProps> {
  get creatorId(): EntityId {
    return this.props.creatorId
  }

  get creatorName(): string {
    return this.props.creatorName
  }

  get text(): string {
    return this.props.text
  }

  get createdAt(): Date | null {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<MessageProps, 'createdAt'>,
    id?: EntityId,
  ): Message {
    const message = new Message(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return message
  }
}
