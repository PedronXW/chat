import { app } from '@/infra/http/app'
import { createMessageService } from '@/infra/services/message/create-message'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[GET] /clients/:id', async () => {
    const user = await request(app).post('/clients').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    await createMessageService.execute({
      creatorId: user.body.id,
      creatorName: user.body.name,
      text: 'any_text',
    })

    const fetchResponse = await request(app)
      .get(`/messages`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send()

    expect(fetchResponse.status).toBe(200)
    expect(fetchResponse.body.messages.messages[0].text).toBe('any_text')
  })
})
