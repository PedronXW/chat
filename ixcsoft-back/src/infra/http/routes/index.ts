import { Router } from 'express'
import { authenticationRoutes } from './authentication'
import { clientsRouter } from './clients'
import { messageRouter } from './message'
import { notificationsRouter } from './notification'

const router = Router()

router.use('/sessions', authenticationRoutes)

router.use('/clients', clientsRouter)

router.use('/messages', messageRouter)

router.use('/notifications', notificationsRouter)

export { router }
