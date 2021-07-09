import UserModel from '../models/UserModel'
import { generatePassword } from '../helpers/passwordHelper'
import paginatedHelper from '../helpers/paginatedHelper'

const userService = {
  createUser: async (body, session) => {
    const userData = body
    const password = generatePassword(userData.password)
    const [newUser] = await UserModel.create([{ ...userData, password }], {
      session
    })
    return {
      uid: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
  },

  findUser: async ({ page, limit, ...params }) => {
    const pagination = page > 0 ? page : 1
    const skip = (pagination - 1) * limit || 0
    const query = {}

    if ('dni' in params) query.dni = params.dni
    if ('email' in params) query.email = params.email

    return await paginatedHelper(UserModel, query, skip, limit)
  },

  validateUniqueUser: ({ email, dni }) => {
    return UserModel.findOne({ $or: [{ dni }, { email }] })
  },

  findByEmail: async (email) => {
    return await UserModel.findOne({ email })
  },

  updateUser: async (userData) => {
    return await UserModel.findByIdAndUpdate(userData.uid, { $set: userData })
  }
}

export default userService
