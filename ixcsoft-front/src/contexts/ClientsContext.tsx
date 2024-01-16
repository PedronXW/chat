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
    const response = await fetch(`http://localhost:3333/clients`, {
      headers: {
        authorization: `Bearer ${value.token}`,
      },
    })

    const data = await response.json()

    setClients(data.clients)
  }

  return (
    <ClientsContext.Provider value={{ clients, fetchClients, setClients }}>
      {children}
    </ClientsContext.Provider>
  )
}
