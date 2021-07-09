import fetch from 'node-fetch'
import BankModel from '../models/BankModel'
import { accountTypes } from '../utils/businessVars'

const bankService = {
  findBanks: (params) => {
    const query = {}
    if ('id' in params) query._id = params.id
    return BankModel.find(query)
  },

  findAccountTypes: () => {
    return accountTypes
  },

  createBanks: async () => {
    const resp = await fetch(
      process.env.URL_BANKS || 'https://bast.dev/api/banks.php'
    )
    const { banks } = await resp.json()

    const bankPromises = []
    for (let b of banks) {
      bankPromises.push(BankModel.create([{ name: b.name, internalId: b.id }]))
    }

    return Promise.all(bankPromises)
  }
}

export default bankService
