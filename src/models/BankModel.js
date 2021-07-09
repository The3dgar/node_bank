import { Schema, model } from 'mongoose'

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    internalId: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true, versionKey: false }
)

const BankModel = model('Bank', ModelSchema)
export default BankModel
