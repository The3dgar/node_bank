import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'

const getBanks = () => [
  check('id', `id must be valid`).optional().isMongoId()
]

const bankValidation = (path) => {
  let errorMiddleware = []
  switch (path) {
    case 'getBanks':
      errorMiddleware = getBanks()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default bankValidation
