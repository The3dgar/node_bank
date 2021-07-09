/**
  Users Routes
  host+/api/user
*/

import { Router } from 'express'
import userController from '../controllers/userController'
import userValidation from '../validations/userValidation'

const userRouter = Router()

userRouter.post('/', userValidation('newUser'), userController.newUser)

export default userRouter
