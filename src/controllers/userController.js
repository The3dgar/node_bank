import sessionHelper from '../helpers/sessionHelper'
import { generateToken } from '../helpers/tokenHelper'
import userService from '../services/userService'

const userController = {
  newUser: async (req, res) => {
    const session = await sessionHelper.startTransation()
    try {
      const isNew = await userService.validateUniqueUser(req.body)
      if (isNew) return res.status(400).json("User data must be unique")

      const user = await userService.createUser(req.body, session)
      const token = await generateToken(user)
      
      await session.commitTransaction()
      res.json({
        token, user
      })
    } catch (error) {
      await session.abortTransaction()
      console.log(error)
      res.status(500).json('Please contact with admin')
    }
  },

  getUsers: async (req, res) => {
    try {
      const [total, data] = await userService.findUser(req.query)

      res.json({
        total,
        data
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  }
}

export default userController
