import { useContext, useEffect } from 'react'
import { ClientsContext } from '../../../contexts/ClientsContext'
import { ClientCell } from './ClientCell'

export const ClientList = () => {
  const { clients, fetchClients } = useContext(ClientsContext)
  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="w-full flex flex-col flex-1 overflow-y-scroll">
      {clients ? (
        clients.map((client) => <ClientCell key={client.id} client={client} />)
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  )
}
