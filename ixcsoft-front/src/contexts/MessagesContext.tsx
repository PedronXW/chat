import { ReactNode, createContext, useState } from 'react'
import { usePersistanceStore } from '../hooks/usePersistanceStore'

export type Message = {
  id: string
  text: string
  creatorId: string
  creatorName: string
  messageId: string
  createdAt: Date
}

export type MessageParams = {
  page: number
  limit: number
}

interface MessagesContext {
  messages: Message[]
  fetchMessages: ({ page, limit }: MessageParams) => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  count: number
}

interface MessagesContextInterface {
  children: ReactNode
}

export const MessagesContext = createContext({} as MessagesContext)

export const MessagesProvider = ({ children }: MessagesContextInterface) => {
  const { value } = usePersistanceStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [count, setCount] = useState<number>(1)

  async function fetchMessages({ page, limit }: MessageParams) {
    const response = await fetch(
      `http://localhost:3333/messages?` +
        new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        }),
      {
        headers: {
          authorization: `Bearer ${value.token}`,
        },
      },
    )

    const data = await response.json()

    console.log(data, page, messages, count)

    const newMessages = data.messages.reverse()

    setMessages((prev) => [...newMessages, ...prev])
    setCount(data.count)
  }

  return (
    <MessagesContext.Provider
      value={{ messages, fetchMessages, setMessages, count }}
    >
      {children}
    </MessagesContext.Provider>
  )
}
