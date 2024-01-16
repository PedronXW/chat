import { makeClient } from 'test/factories/client-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryNotificationRepository } from 'test/repositories/InMemoryNotificationRepository'
import { CreateNotificationService } from './create-notification'

let sut: CreateNotificationService
let inMemoryClientRepository: InMemoryClientRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository

describe('Create Notification', () => {
  beforeAll(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new CreateNotificationService(inMemoryNotificationRepository)
  })

  it('should be able to create a notification', async () => {
    const client = makeClient()
    await inMemoryClientRepository.createClient(client)

    const result = await sut.execute({
      title: 'any_title',
      clientId: client.id.getValue(),
      description: 'any_description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.notifications[0].clientId).toEqual(
      client.id.getValue(),
    )
  })
})
