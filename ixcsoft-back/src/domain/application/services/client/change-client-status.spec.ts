import { makeClient } from 'test/factories/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { ChangeClientStatusService } from './change-client-status'

let sut: ChangeClientStatusService
let inMemoryClientRepository: InMemoryClientRepository

describe('ChangeClientStatus', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new ChangeClientStatusService(inMemoryClientRepository)
  })

  it('should be able to change a client status', async () => {
    const client = makeClient({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })

    await inMemoryClientRepository.createClient(client)

    const result = await sut.execute(client.id.getValue(), 'online')

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientRepository.clients[0].status).toEqual('online')
  })
})
