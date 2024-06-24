import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect } from 'react'
import { ClientsContext } from '../../../contexts/ClientsContext'
import { usePersistanceStore } from '../../../hooks/usePersistanceStore'
import { ClientCell } from './ClientCell'

export const ClientList = () => {
  const { clients, fetchClients } = useContext(ClientsContext)
  useEffect(() => {
    fetchClients()
  }, [])

  const token = usePersistanceStore().value.token

  const { sub } = token ? jwtDecode(token) : { sub: '' }

  return (
    <div className="w-full flex flex-col flex-1 overflow-y-scroll">
      {clients ? (
        clients.map((client) => {
          return client.id !== sub ? (
            <ClientCell key={client.id} client={client} />
          ) : null
        })
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  )
}
