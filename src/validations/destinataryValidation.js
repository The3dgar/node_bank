import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'
import destinataryService from '../services/destinataryService'
import { accountTypes } from '../utils/businessVars'
import { validateDni } from '../utils/general'

const newDestinatary = () => [
  check('name', `"name" is required and must have min 4 chars`)
    .notEmpty()
    .isLength({ min: 4 }),
  check('dni', `"dni" is required & must be valid`)
    .notEmpty()
    .custom(validateDni),
  check('email', `"email" is required`).isEmail(),
  check('phoneNumber', `"phoneNumber" is required & must be valid`)
    .notEmpty()
    .isMobilePhone(),
  check('bankId', `"bankId" is required and must be valid`).isMongoId(),
  check('accountType', `"accountType" is required and must be valid`).isIn(
    accountTypes
  ),
  check('accountNumber', `"accountNumber" is required and must be unique`)
    .notEmpty()
    .custom(async (val, { req }) => {
      const isNew = await destinataryService.validateUniqueAccount(
        req.body,
        req.user.uid
      )
      if (!!isNew) return Promise.reject('Account must be unique')
    })
]

const getDestinataries = () => [
  check('dni', `dni must be valid`).optional().custom(validateDni)
]

const destinataryValidation = (path) => {
  let errorMiddleware = []
  switch (path) {
    case 'newDestinatary':
      errorMiddleware = newDestinatary()
      break
    case 'getDestinataries':
      errorMiddleware = getDestinataries()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default destinataryValidation
