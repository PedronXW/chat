import { makeClient } from 'test/factories/client-factory'
import { makeNotification } from 'test/factories/notification-factory'
import { InMemoryClientRepository } from 'test/repositories/InMemoryClientRepository'
import { InMemoryNotificationRepository } from 'test/repositories/InMemoryNotificationRepository'
import { FetchNotificationByClientService } from './fetch-notification-by-client'

let sut: FetchNotificationByClientService
let inMemoryNotificationRepository: InMemoryNotificationRepository
let inMemoryClientRepository: InMemoryClientRepository

describe('Fetch All My Notifications', () => {
  beforeAll(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new FetchNotificationByClientService(inMemoryNotificationRepository)
  })

  it('should be able to fetch all my notifications', async () => {
    const client = makeClient()
    await inMemoryClientRepository.createClient(client)

    const notification = makeNotification({
      clientId: client.id,
      description: 'Test',
      title: 'Test',
    })

    inMemoryNotificationRepository.sendNotification(notification)

    const result = await sut.execute({
      id: client.id.getValue(),
      query: { page: 1, limit: 10 },
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.notifications[0].clientId).toEqual(
      client.id.getValue(),
    )
  })
})
