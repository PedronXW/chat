import { EntityId } from '@/@shared/entities/entity-id'
import { Notification } from '@/domain/enterprise/entities/notification'

export type NotificationPersistence = {
  id: string
  title: string
  description: string
  date: Date
  read: boolean
  clientId: string
}

export class NotificationMapper {
  static toPersistence(notification): NotificationPersistence {
    return {
      id: notification.id.getValue(),
      title: notification.title,
      description: notification.description,
      date: notification.date,
      read: notification.read,
      clientId: notification.clientId.getValue(),
    }
  }

  static toDomain(notification): Notification {
    const newNotification = Notification.create(
      {
        title: notification.title,
        description: notification.description,
        date: notification.date,
        read: notification.read,
        clientId: new EntityId(notification.clientId),
      },
      new EntityId(notification.id),
    )
    return newNotification
  }
}
