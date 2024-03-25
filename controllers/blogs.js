const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(!req.blog){
    res.status(404).send(`Could not find blog with id: ${req.params.id}`)
  }
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`
    }
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId'] 
    },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id})
  return res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  await Blog.destroy({
    where: {
      id: req.params.id,
      userId: user.id
    }
  })
  res.status(204).send()
})

router.put('/:id', blogFinder, async (req, res) => {
  if(!req.body.likes){
    throw new Error("likes not defined in request body")
  }
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router