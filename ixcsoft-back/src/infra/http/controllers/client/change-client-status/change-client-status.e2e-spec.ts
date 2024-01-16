import { app } from '@/infra/http/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[UPDATE] /clients/:id', async () => {
    await request(app).post('/clients').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const responseUpdate = await await request(app)
      .put(`/clients/status`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send()

    expect(responseUpdate.status).toBe(201)
  })
})
