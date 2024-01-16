import { NotificationRepository } from '@/domain/application/repositories/notification-repository'
import { Notification } from '@/domain/enterprise/entities/notification'
import {
  NotificationMapper,
  NotificationPersistence,
} from '@/infra/database/mappers/notification-mapper'

export class InMemoryNotificationRepository implements NotificationRepository {
  notifications: NotificationPersistence[] = []

  async sendNotification(notification: Notification): Promise<Notification> {
    this.notifications.push(NotificationMapper.toPersistence(notification))

    return notification
  }

  async getNotificationsByClientId(
    clientId: string,
    params: { page: number; limit: number },
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.clientId === clientId,
    )

    const notificationsPaginated = notifications.slice(
      params.page * params.limit,
      params.page * params.limit + params.limit,
    )

    return notificationsPaginated.map(NotificationMapper.toDomain)
  }
}
