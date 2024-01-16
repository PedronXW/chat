import { Router } from 'express'
import { fetchNotificationByClientController } from '../controllers/notification/fetch-notification-by-client'
import { verifyAuthentication } from '../middlewares/verifyAuthentication'

const notificationsRouter = Router()

notificationsRouter.get('/', verifyAuthentication, async (req, res) => {
  return fetchNotificationByClientController.handle(req, res)
})

export { notificationsRouter }
