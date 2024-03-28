const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')
const tokenExtractor = require('../middleware/tokenExtractor')

router.delete('/', tokenExtractor, async (request, response) => {
  const token = request.token
  console.log('token', token)
  await Session.destroy({
    where: {
      token: token
    }
  })

  response.status(204).send()
})

module.exports = router