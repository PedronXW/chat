import { Entity } from '@/@shared/entities/entity'
import { EntityId } from '@/@shared/entities/entity-id'
import { Optional } from '@/@shared/types/optional'

export interface ClientProps {
  name: string
  email: string
  password: string
  status: 'online' | 'offline'
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Client extends Entity<ClientProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get status(): 'online' | 'offline' {
    return this.props.status
  }

  set status(status: 'online' | 'offline') {
    this.props.status = status
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date | null {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ClientProps, 'createdAt' | 'status'>,
    id?: EntityId,
  ): Client {
    const client = new Client(
      {
        ...props,
        status: props.status ?? 'offline',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return client
  }
}
