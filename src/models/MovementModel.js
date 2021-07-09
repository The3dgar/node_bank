import { Schema, model } from 'mongoose'

const ModelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destinataryId: {
      type: Schema.Types.ObjectId,
      ref: 'Destinatary',
      required: true
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true, versionKey: false }
)

const MovementModel = model('Movement', ModelSchema)
export default MovementModel
