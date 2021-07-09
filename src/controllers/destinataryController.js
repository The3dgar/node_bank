import destinataryService from '../services/destinataryService'

const destinataryController = {
  newDestinatary: async (req, res) => {
    try {
      const [destinatary] = await destinataryService.createDestinatary(
        req.body,
        req.user.uid
      )
      res.status(201).json(destinatary)
    } catch (error) {
      console.log(error)
      res.status(500).json('Please contact with admin')
    }
  },

  getDestinataries: async (req, res) => {
    try {
      const destinataries = await destinataryService.findDestinataries(
        req.query,
        req.user.uid
      )

      res.json({
        destinataries
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

export default destinataryController
