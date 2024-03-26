const router = require('express').Router()
const { Op } = require('sequelize')

const { ReadingList, User } = require('../models')
const { sequelize } = require('../util/db')
const tokenExtractor = require('../middleware/tokenExtractor')


router.post('/', async(req, res) => {
  console.log('body', req.body)
  const newListEntry = await ReadingList.create(req.body)
  console.log('blog', newListEntry)
  return res.json(newListEntry)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  if(!req.body.readingState){
    throw new Error("readingState not defined in request body")
  }
  let listEntry = await ReadingList.findByPk(req.params.id)
  if(!listEntry){
    throw new Error(`could not find ReadingList entry with this id: ${req.params.id}`)
  }
  const user = await User.findByPk(req.decodedToken.id)
  if(user.id !== listEntry.userId){
    throw new Error(`token is not valid for editing this entry, you can only edit your own entries`)
  }
  listEntry.readingState = req.body.readingState
  await listEntry.save()
  res.json(listEntry)
})

module.exports = router