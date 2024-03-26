const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      through: ReadingList,
      through:{
        attributes:['readingState', 'id']
      },
      as:'readings',
    }]
  })
  if(!req.user){
    res.status(404).send(`Could not find user with id: ${req.params.id}`)
  }
  else {
    next()
  }
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
    ]
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}
  switch (req.query.read) {
    case 'read':
      where.readingState = 'read'
      break
    case 'unread':
      where.readingState = 'unread'
      break
    default:
      break
  }

  const user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      through: ReadingList,
      through:{
        attributes:['readingState', 'id'],
        where
      },
      as:'readings'
    }]
  })
  if(!user){
    res.status(404).send(`Could not find user with id: ${req.params.id}`)
  }
  res.json(user)
})

router.put('/:username', async(req, res) => {
  let user = await User.findOne({where: {username: req.params.username}})
  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router