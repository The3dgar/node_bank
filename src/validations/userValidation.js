import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'
import userService from '../services/userService'
import { userRoles } from '../utils/businessVars'
import { validateDni } from '../utils/general'

const newUser = () => [
  check('name', `"name" is required and must have min 4 chars`)
    .notEmpty()
    .isLength({ min: 4 }),
  check('dni', `"dni" is required & must be valid`)
    .notEmpty()
    .custom(validateDni),
  check('email', `"email" is required and must be unique`).isEmail(),
  check('password', `"password" must have min 6 char`)
    .isLength({ min: 6 }),
  check('phoneNumber', `"phoneNumber" is required & must be valid`)
    .optional()
    .isMobilePhone(),
]

const getUsers = () => [
  check('dni', `dni must be valid`).optional().custom(validateDni)
]

const userValidation = (path) => {
  let errorMiddleware = []
  switch (path) {
    case 'newUser':
      errorMiddleware = newUser()
      break
    case 'getUsers':
      errorMiddleware = getUsers()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default userValidation
