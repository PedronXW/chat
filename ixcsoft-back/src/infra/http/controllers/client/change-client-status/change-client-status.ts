import { ChangeClientStatusService } from '@/domain/application/services/client/change-client-status'
import { Response } from 'express'
import { z } from 'zod'

const changeClientStatusZodParamsSchema = z.object({
  id: z.string().uuid(),
})

export class ChangeClientStatusController {
  constructor(private changeClientStatusService: ChangeClientStatusService) {}

  async handle(req, res): Promise<Response> {
    const { id } = changeClientStatusZodParamsSchema.parse(req.user)

    const editedClient = await this.changeClientStatusService.execute(id)

    if (editedClient.isLeft()) {
      return res.status(404).send({ error: editedClient.value.message })
    }

    return res.status(201).send({ client: editedClient.value })
  }
}
