import 'dotenv'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { usePersistanceStore } from '../hooks/usePersistanceStore'

export type Client = {
  id: string
  name: string
  email: string
  status: 'online' | 'offline'
  createdAt: Date
  updatedAt: Date
}

interface ClientsContext {
  clients: Client[]
  fetchClients: () => void
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
}

interface ClientsContextInterface {
  children: ReactNode
}

export const ClientsContext = createContext({} as ClientsContext)

export const ClientsProvider = ({ children }: ClientsContextInterface) => {
  const { value } = usePersistanceStore()
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    fetchClients()
    console.log('fetching clients')
  }, [])

  async function fetchClients() {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/clients`,
      {
        headers: {
          authorization: `Bearer ${value.token_ixsoft_test_authentication}`,
        },
      },
    )

    const data = await response.json()

    setClients(data.clients)
  }

  return (
    <ClientsContext.Provider value={{ clients, fetchClients, setClients }}>
      {children}
    </ClientsContext.Provider>
  )
}
