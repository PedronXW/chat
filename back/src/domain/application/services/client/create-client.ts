import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client'
import { HashGenerator } from '../../cryptography/hash-generator'
import { ClientRepository } from '../../repositories/client-repository'
import { ClientAlreadyExistsError } from '../errors/ClientAlreadyExistsError'

interface CreateClientServiceRequest {
  name: string
  email: string
  password: string
}

type CreateClientServiceResponse = Either<ClientAlreadyExistsError, Client>

export class CreateClientService {
  constructor(
    private clientRepository: ClientRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateClientServiceRequest): Promise<CreateClientServiceResponse> {
    const clientExists = await this.clientRepository.getClientByEmail(email)

    if (clientExists) {
      return left(new ClientAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const client = Client.create({
      name,
      email,
      password: hashedPassword,
    })

    const newClient = await this.clientRepository.createClient(client)

    return right(newClient)
  }
}
