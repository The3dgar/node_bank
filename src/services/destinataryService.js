import paginatedHelper from '../helpers/paginatedHelper'
import DestinataryModel from '../models/DestinataryModel'

const destinataryService = {
  createDestinatary: async (body, userId) => {
    const newDestinatary = {
      ...body,
      userId
    }
    return await DestinataryModel.create([newDestinatary])
  },

  findDestinataries: (params, userId) => {
    const query = { userId }
    if ('id' in params) query._id = params.id

    return DestinataryModel.find(query).populate({
      path: 'bankId',
      select: 'name'
    })
  },

  validateUniqueAccount: (params, userId) => {
    return DestinataryModel.findOne({
      ...params,
      userId
    })
  }
}

export default destinataryService
