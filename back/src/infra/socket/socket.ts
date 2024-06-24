import { createServer } from 'http'
import { Server } from 'socket.io'
import { app } from '../http/app'
import { changeClientStatusService } from '../services/client/change-client-status'
import { createMessageService } from '../services/message/create-message'
import { verifySocketAuthentication } from './middlewares/verifySocketAuthentication'

const server = createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } })

io.use(verifySocketAuthentication)

io.on('connection', async (socket) => {
  socket.setMaxListeners(0)

  const user = await changeClientStatusService.execute(
    socket.handshake.headers.user as string,
    'online',
  )

  io.emit('user_connected', {
    name: user.value!.name,
    id: socket.handshake.headers.user as string,
  })

  socket.data.username = user.value!.name

  socket.on('message', async (data) => {
    await createMessageService.execute({
      text: data.text,
      creatorName: socket.data.username,
      creatorId: socket.handshake.headers.user as string,
    })

    io.emit('receive_message', {
      text: data.text,
      creatorId: socket.handshake.headers.user as string,
      creatorName: socket.data.username,
      createdAt: new Date(),
    })
  })

  socket.on('disconnect', async () => {
    const user = await changeClientStatusService.execute(
      socket.handshake.headers.user as string,
      'offline',
    )

    io.emit('user_disconnected', {
      name: user.value!.name,
      id: socket.handshake.headers.user as string,
    })
  })
})

export { server }
