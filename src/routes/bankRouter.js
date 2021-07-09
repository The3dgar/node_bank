/**
  Bank Routes
  host+/api/bank
*/

import { Router } from 'express'
import bankController from '../controllers/bankController'
import tokenValidation from '../middlewares/tokenValidation'
import bankValidation from '../validations/bankValidation'

const bankRouter = Router()

bankRouter.get(
  '/',
  tokenValidation,
  bankValidation('getBanks'),
  bankController.getBanks
)
bankRouter.post('/', tokenValidation, bankController.newBanks)

export default bankRouter
