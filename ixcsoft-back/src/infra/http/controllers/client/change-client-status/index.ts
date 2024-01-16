import { changeClientStatusService } from '@/infra/services/client/change-client-status'
import { ChangeClientStatusController } from './change-client-status'

const changeClientStatusController = new ChangeClientStatusController(
  changeClientStatusService,
)

export { changeClientStatusController }
