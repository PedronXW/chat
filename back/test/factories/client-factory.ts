import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client'

export function makeClient(override: Partial<Client> = {}, id?: EntityId) {
  const client = Client.create(
    {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      status: 'offline',
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return client
}
