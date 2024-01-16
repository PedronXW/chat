import { makeClient } from 'test/factories/client-factory'
import { makeMessage } from 'test/factories/message-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryMessageRepository } from 'test/repositories/InMemoryMessageRepository'
import { GetMessagesService } from './get-messages'

let sut: GetMessagesService
let inMemoryMessageRepository: InMemoryMessageRepository
let inMemoryClientRepository: InMemoryClientRepository

describe('Fetch Message By Chat', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryMessageRepository = new InMemoryMessageRepository()
    sut = new GetMessagesService(inMemoryMessageRepository)
  })

  it('should be able to fetch messages by chat id', async () => {
    const client = makeClient()
    await inMemoryClientRepository.createClient(client)

    const message = makeMessage({
      text: 'any_text',
      creatorId: client.id,
    })

    inMemoryMessageRepository.createMessage(message)

    const result = await sut.execute({
      query: { page: 1, limit: 10 },
    })

    expect(result.isRight()).toBe(true)
  })
})
