import { Notification } from '@/domain/enterprise/entities/notification'
import { PaginationType } from './utils/pagination-type'

export abstract class NotificationRepository {
  abstract sendNotification(notification: Notification): Promise<Notification>
  abstract getNotificationsByClientId(
    clientId: string,
    params: PaginationType,
  ): Promise<Notification[]>
}
