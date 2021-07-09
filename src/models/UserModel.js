import { Schema, model } from 'mongoose'

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    dni: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    changePassword: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true, versionKey: false }
)

ModelSchema.set('toJSON', {
  transform: (raw, doc) => {
    const result = {
      ...doc
    }

    delete result.password
    delete result.changePassword

    return result
  }
})

const UserModel = model('User', ModelSchema)
export default UserModel
