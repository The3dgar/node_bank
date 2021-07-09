import { Schema, model } from 'mongoose'

const ModelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dni: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    bankId: {
      type: Schema.Types.ObjectId,
      ref: 'Bank',
      required: true
    },
    accountType: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)

const DestinataryModel = model('Destinatary', ModelSchema)
export default DestinataryModel
