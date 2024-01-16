import { FetchNotificationByClientService } from '@/domain/application/services/notification/fetch-notification-by-client'
import { NotificationPresenter } from '@/infra/http/presenters/presenter-notification'
import { Response } from 'express'
import { z } from 'zod'

const fetchNotificationByClientZodSchema = z.object({
  id: z.string().uuid(),
})

const fetchNotificationByClientQueryZodSchema = z.object({
  page: z.string().optional().default('0'),
  limit: z.string().optional().default('10'),
})

export class FetchNotificationByClientController {
  constructor(
    private readonly fetchNotificationsBymessageService: FetchNotificationByClientService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { id } = fetchNotificationByClientZodSchema.parse(req.user)

    const { page, limit } = fetchNotificationByClientQueryZodSchema.parse(
      req.query,
    )

    const notifications = await this.fetchNotificationsBymessageService.execute(
      {
        id,
        query: {
          page: Number(page),
          limit: Number(limit),
        },
      },
    )

    return res.status(200).send({
      notifications: notifications.value!.map(NotificationPresenter.toHTTP),
    })
  }
}
