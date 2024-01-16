import { jwtDecode } from 'jwt-decode'
import { enqueueSnackbar } from 'notistack'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { usePersistanceStore } from '../hooks/usePersistanceStore'
import { ClientsContext } from './ClientsContext'
import { MessagesContext } from './MessagesContext'

interface SocketContext {
  socket: any
}

interface SocketContextInterface {
  children: ReactNode
}

export const SocketContext = createContext({} as SocketContext)

export const SocketProvider = ({ children }: SocketContextInterface) => {
  const [socket, setSocket] = useState<any>()

  const { setMessages } = useContext(MessagesContext)

  const { fetchClients } = useContext(ClientsContext)

  const token = usePersistanceStore().value.token

  const { sub } = token ? jwtDecode(token) : { sub: '' }

  useEffect(() => {
    connectionToServer()
  }, [token])

  async function connectionToServer() {
    const newSocket = await io('http://localhost:3333/', {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    })

    setSocket(newSocket)

    newSocket.on('receive_message', (data: any) => {
      setMessages((oldMessages) => [...oldMessages, { ...data, id: uuidv4() }])

      console.log(data)

      if (data.creatorId !== sub) {
        enqueueSnackbar(`Nova mensagem recebida de ${data.creatorName}`, {
          variant: 'info',
        })
      }
    })

    newSocket.on('connect_error', (err: { message: any }) => {
      console.log(err instanceof Error)
      console.log(err.message)
    })

    newSocket.on('user_connected', (data: any) => {
      fetchClients()

      enqueueSnackbar(`Usuário ${data.name} se conectou`, {
        variant: 'success',
      })
    })

    newSocket.on('user_disconnected', (data: any) => {
      fetchClients()
      enqueueSnackbar(`Usuário ${data.name} se desconectou`, {
        variant: 'error',
      })
    })
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
