import { app } from '@/infra/http/app'
import { createNotificationService } from '@/infra/services/notification/create-notification'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[GET] /messages', async () => {
    const client = await request(app).post('/clients').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    createNotificationService.execute({
      title: 'title',
      description: 'description',
      clientId: authentication.body.id,
    })

    const fetchResponse = await request(app)
      .get(`/notifications`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)

    console.log(fetchResponse.body)

    expect(fetchResponse.status).toBe(200)
  })
})
