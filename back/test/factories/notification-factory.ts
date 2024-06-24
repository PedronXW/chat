import { EntityId } from '@/@shared/entities/entity-id'
import { Notification } from '@/domain/enterprise/entities/notification'

export function makeNotification(
  override: Partial<Notification> = {},
  id?: EntityId,
) {
  return Notification.create(
    {
      title: 'any_title',
      description: 'any_description',
      date: new Date(),
      read: false,
      clientId: new EntityId('any_id'),
      ...override,
    },
    id,
  )
}
