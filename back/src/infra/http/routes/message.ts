import { Router } from 'express'
import { getMessagesController } from '../controllers/message/get-messages'
import { verifyAuthentication } from '../middlewares/verifyAuthentication'

const messageRouter = Router()

messageRouter.get('/', verifyAuthentication, (request, response) => {
  return getMessagesController.handle(request, response)
})

export { messageRouter }
