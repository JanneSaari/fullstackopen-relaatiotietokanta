const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(!req.blog){
    res.status(404).send(`Could not find blog with id: ${req.params.id}`)
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

router.delete('/:id', async (req, res) => {
  await Blog.destroy({
    where: {
      id: req.params.id
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