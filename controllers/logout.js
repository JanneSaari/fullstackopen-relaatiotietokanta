const router = require('express').Router()

const Session = require('../models/session')
const tokenExtractor = require('../middleware/tokenExtractor')

router.delete('/', tokenExtractor, async (request, response) => {
  const token = request.token
  console.log('token', token)
  // Session could be just invalidated instead of deleted,
  // that way we would have simple login history if wanted
  await Session.destroy({
    where: {
      token: token
    }
  })

  response.status(204).send()
})

module.exports = router