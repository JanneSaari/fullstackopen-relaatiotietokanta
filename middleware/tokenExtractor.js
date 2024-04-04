const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.token = authorization.substring(7)
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const session = await Session.findOne({where: {
        token: authorization.substring(7)
      }})
      console.log('session: ', session)
      if(!session){
        throw new Error('invalid session token')
      }
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    } 
  } 
  else {
    return res.status(401).json({ error: 'token missing' })  
  }
  next()
}

module.exports = tokenExtractor