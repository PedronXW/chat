import { GetMessagesService } from '@/domain/application/services/message/get-messages'
import { MessagePresenter } from '@/infra/http/presenters/presenter-message'
import { Response } from 'express'
import { z } from 'zod'

const getMessagesQueryZodSchema = z.object({
  page: z.string().optional().default('0'),
  limit: z.string().optional().default('10'),
})

export class GetMessagesController {
  constructor(
    private readonly fetchMessagesByChatService: GetMessagesService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { page, limit } = getMessagesQueryZodSchema.parse(req.query)

    const messages = await this.fetchMessagesByChatService.execute({
      query: {
        page: Number(page),
        limit: Number(limit),
      },
    })

    if (messages.isLeft()) {
      return res.status(404).send({ error: messages.value.message })
    }

    return res.status(200).send({
      messages: messages.value.messages.map(MessagePresenter.toHTTP),
      count: messages.value.count,
    })
  }
}
