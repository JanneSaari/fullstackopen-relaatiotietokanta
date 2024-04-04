const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')
const { SESSION_LIFETIME} = require('../util/config')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  // Currently allows multiple sessions for same user,
  // so not checking if there is already existing one
  console.log(request.body)
  const currentDate = new Date()
  let expiresAt = currentDate.getTime() + SESSION_LIFETIME
  const session = await Session.create({
    userId: user.id,
    token: token,
    expiresAt: expiresAt
  })

  console.log('session: ', session)

  response
    .status(200)
    .send({ 
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = router