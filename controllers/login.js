const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

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
  
  let session = await Session.findOne({
    where: {
      userId: user.id
    }
  })
  if(!session){
    const newSession = await Session.create({
      ...request.body, 
      userId: user.id,
      token: token 
    })
    console.log('newSession', newSession)
    session = newSession
  }

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