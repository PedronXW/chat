import { getMessagesService } from '@/infra/services/message/get-messages'
import { GetMessagesController } from './get-messages'

const getMessagesController = new GetMessagesController(getMessagesService)

export { getMessagesController }
