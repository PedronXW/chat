import { fetchNotificationByClientService } from '@/infra/services/notification/fetch-notification-by-client'
import { FetchNotificationByClientController } from './fetch-notification-by-client'

const fetchNotificationByClientController =
  new FetchNotificationByClientController(fetchNotificationByClientService)

export { fetchNotificationByClientController }
