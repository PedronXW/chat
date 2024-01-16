import { Either, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Notification } from '@/domain/enterprise/entities/notification'
import { NotificationRepository } from '../../repositories/notification-repository'

interface CreateNotificationServiceProps {
  title: string
  description: string
  clientId: string
}

type CreateNotificationServiceResponse = Either<null, Notification>

export class CreateNotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    title,
    description,
    clientId,
  }: CreateNotificationServiceProps): Promise<CreateNotificationServiceResponse> {
    const notification = Notification.create({
      title,
      description,
      clientId: new EntityId(clientId),
    })

    const createdNotification =
      await this.notificationRepository.sendNotification(notification)

    return right(createdNotification)
  }
}
