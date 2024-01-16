import { Client } from '@/domain/enterprise/entities/client'

export type EditClient = {
  name: string
  email: string
}

export abstract class ClientRepository {
  abstract createClient(client: Client): Promise<Client>

  abstract deleteClient(id: string): Promise<boolean>

  abstract editClient(id: string, client: EditClient): Promise<Client>

  abstract getClientByEmail(email: string): Promise<Client | null>

  abstract getClientById(id: string): Promise<Client | null>

  abstract getAllClients(): Promise<Client[]>

  abstract changeStatus(
    id: string,
    status: 'online' | 'offline',
  ): Promise<Client>
}
