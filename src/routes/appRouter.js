import pkg from '../../package.json'
import { Router } from 'express'
const router = Router()

import authRouter from './authRouter'
import userRouter from './userRouter'
import bankRouter from './bankRouter'
import destinataryRouter from './destinataryRouter'
import movementRouter from './movementRouter'

router.get('/', (req, res) => {
  const { name, author, version, description } = pkg

  return res.json({
    name,
    author,
    version,
    description
  })
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/bank', bankRouter)
router.use('/destinatary', destinataryRouter)
router.use('/movement', movementRouter)

export default router