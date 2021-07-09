import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'
import { validateDni } from '../utils/general'

const newMovement = () => [
  check('amount', `"amount" is required and must have min 4 chars`)
    .isInt()
    .notEmpty(),
  check(
    'destinataryId',
    `"destinataryId" is required and must be valid`
  ).isMongoId()
]

const getMovements = () => [
  check('name', `name must be valid`).optional().isString(),
  check('dni', `dni must be valid`).optional().custom(validateDni)
]

const movementValidation = (path) => {
  let errorMiddleware = []
  switch (path) {
    case 'newMovement':
      errorMiddleware = newMovement()
      break
    case 'getMovements':
      errorMiddleware = getMovements()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default movementValidation
