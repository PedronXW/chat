import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client'
import { ClientRepository } from '../../repositories/client-repository'
import { ClientNonExistsError } from '../errors/ClientNonExists'

type ChangeClientStatusServiceResponse = Either<ClientNonExistsError, Client>

export class ChangeClientStatusService {
  constructor(private clientRepository: ClientRepository) {}

  async execute(
    id: string,
    status: 'online' | 'offline',
  ): Promise<ChangeClientStatusServiceResponse> {
    const client = await this.clientRepository.getClientById(id)

    if (!client) {
      return left(new Error('Client not found'))
    }

    const updatedClient = await this.clientRepository.changeStatus(id, status)

    return right(updatedClient)
  }
}
