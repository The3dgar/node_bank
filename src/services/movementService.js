import MovementModel from '../models/MovementModel'

const movementService = {
  createMovement: async (body, userId) => {
    const newMovement = {
      userId,
      ...body
    }
    return await MovementModel.create([newMovement])
  },
  findMovements: (params, userId) => {
    const query = { userId }
    if ('id' in params) query._id = params.id

    return MovementModel.find(query).populate({
      path: 'destinataryId',
      select: 'name dni bankId accountType accountNumber',
      populate: {
        path: 'bankId',
        select: 'name'
      }
    })
  }
}

export default movementService
