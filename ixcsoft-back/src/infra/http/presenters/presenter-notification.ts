import { Notification } from '@/domain/enterprise/entities/notification'

export class NotificationPresenter {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id.getValue(),
      title: notification.title,
      description: notification.description,
      date: notification.date,
      clientId: notification.clientId.getValue(),
    }
  }
}
