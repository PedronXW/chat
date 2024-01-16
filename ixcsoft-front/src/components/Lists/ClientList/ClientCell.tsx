import { Client } from '../../../contexts/ClientsContext'

interface ClientCellProps {
  client: Client
}

export const ClientCell = ({ client }: ClientCellProps) => {
  return (
    <div className="bg-white items-center justify-between flex h-20 p-3 pb-5 shadow-sm m-1 border-b-2 border-gray-200">
      <div className="flex flex-col">
        <strong className="text-lg font-medium">{client.name}</strong>
        <p className="text-xs font-light">ID: {client.id}</p>
      </div>
      <div
        className={`h-3 w-3 rounded-full shadow-md ${client.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
      />
    </div>
  )
}
