/**
  movement Routes
  host+/api/movement
*/

import { Router } from 'express'
import movementController from '../controllers/movementController'
import tokenValidation from '../middlewares/tokenValidation'
import movementValidation from '../validations/movementValidation'

const movementRouter = Router()

movementRouter.post(
  '/',
  tokenValidation,
  movementValidation('newMovement'),
  movementController.newMovement
)
movementRouter.get(
  '/',
  tokenValidation,
  movementValidation('getMovements'),
  movementController.getMovements
)

export default movementRouter
