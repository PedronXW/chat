import { Either, right } from '@/@shared/either'
import { Notification } from '@/domain/enterprise/entities/notification'
import { NotificationRepository } from '../../repositories/notification-repository'
import { PaginationType } from '../../repositories/utils/pagination-type'

type FetchNotificationByClientServiceRequest = {
  id: string
  query: PaginationType
}

type FetchNotificationByClientServiceResponse = Either<null, Notification[]>

export class FetchNotificationByClientService {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    id,
    query,
  }: FetchNotificationByClientServiceRequest): Promise<FetchNotificationByClientServiceResponse> {
    const notification =
      await this.notificationRepository.getNotificationsByClientId(id, query)

    return right(notification)
  }
}
