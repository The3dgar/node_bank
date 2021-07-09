/**
  Destinatary Routes
  host+/api/destinatary
*/

import { Router } from 'express'
import destinataryController from '../controllers/destinataryController'
import tokenValidation from '../middlewares/tokenValidation'
import destinataryValidation from '../validations/destinataryValidation'

const destinataryRouter = Router()

destinataryRouter.post('/', tokenValidation, destinataryValidation('newDestinatary'), destinataryController.newDestinatary)
destinataryRouter.get('/', tokenValidation, destinataryValidation('getDestinataries'), destinataryController.getDestinataries)

export default destinataryRouter
