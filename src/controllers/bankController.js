import bankService from '../services/bankService'

const bankController = {
  newBanks: async (req, res) => {
    try {
      await bankService.createBanks()

      res.sendStatus(201)
    } catch (error) {
      if ("code" in error) {
        return res.status("200").json({
          msg: "Banks already loaded!"
        })
      }
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  },
  getBanks: async (req, res) => {
    try {
      const banks = await bankService.findBanks(req.query)
      const accountTypes = bankService.findAccountTypes()

      res.json({
        banks,
        accountTypes
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  },
}

export default bankController
