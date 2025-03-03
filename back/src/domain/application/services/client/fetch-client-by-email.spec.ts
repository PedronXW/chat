import { makeClient } from 'test/factories/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { FetchClientByEmailService } from './fetch-client-by-email'

let sut: FetchClientByEmailService
let inMemoryClientRepository: InMemoryClientRepository

describe('Fetch Client By Email', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new FetchClientByEmailService(inMemoryClientRepository)
  })

  it('should be able to fetch a client by email', async () => {
    const client = makeClient({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryClientRepository.createClient(client)

    const result = await sut.execute({ email: client.email })

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientRepository.clients[0].name).toEqual('any_name')
  })
})
