import { makeClient } from 'test/factories/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryMessageRepository } from 'test/repositories/InMemoryMessageRepository'
import { CreateMessageService } from './create-message'

let sut: CreateMessageService
let inMemoryClientRepository: InMemoryClientRepository
let inMemoryMessageRepository: InMemoryMessageRepository

describe('Create Message', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryMessageRepository = new InMemoryMessageRepository()
    sut = new CreateMessageService(inMemoryMessageRepository)
  })

  it('should be able to create a message', async () => {
    const client = makeClient()
    await inMemoryClientRepository.createClient(client)

    const result = await sut.execute({
      text: 'any_text',
      creatorName: client.name,
      creatorId: client.id.getValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMessageRepository.messages).toHaveLength(1)
  })
})
