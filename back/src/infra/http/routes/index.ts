import { Router } from 'express'
import { authenticationRoutes } from './authentication'
import { clientsRouter } from './clients'
import { messageRouter } from './message'

const router = Router()

router.use('/sessions', authenticationRoutes)

router.use('/clients', clientsRouter)

router.use('/messages', messageRouter)

export { router }
