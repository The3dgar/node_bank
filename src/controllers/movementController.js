import movementService from '../services/movementService'

const movementController = {
  newMovement: async (req, res) => {
    try {
      const [movement] = await movementService.createMovement(
        req.body,
        req.user.uid
      )
      res.status(201).json(movement)
    } catch (error) {
      console.log(error)
      res.status(500).json('Please contact with admin')
    }
  },

  getMovements: async (req, res) => {
    try {
      const movements = await movementService.findMovements(req.query, req.user.uid)

      res.json({
        movements
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

export default movementController
