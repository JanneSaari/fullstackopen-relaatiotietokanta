const router = require('express').Router()

const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  if(!req.user){
    res.status(404).send(`Could not find user with id: ${req.params.id}`)
  }
  else {
    next()
  }
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', userFinder ,async (req, res) => {
  res.json(req.user)
})

router.put('/:username', async(req, res) => {
  let user = await User.findOne({where: {username: req.params.username}})
  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router