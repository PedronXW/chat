import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

export interface NotificationProps {
  title: string
  description: string
  date: Date
  read: boolean
  clientId: EntityId
}

export class Notification extends Entity<NotificationProps> {
  get title(): string {
    return this.props.title
  }

  get description(): string {
    return this.props.description
  }

  get date(): Date {
    return this.props.date
  }

  get read(): boolean {
    return this.props.read
  }

  get clientId(): EntityId {
    return this.props.clientId
  }

  static create(
    props: Optional<NotificationProps, 'date' | 'read'>,
    id?: EntityId,
  ): Notification {
    const notification = new Notification(
      {
        ...props,
        date: props.date ?? new Date(),
        read: props.read ?? false,
      },
      id,
    )
    return notification
  }
}
