const router = require('express').Router()
const { Op } = require('sequelize')

const { ReadingList } = require('../models')
const { sequelize } = require('../util/db')

router.post('/', async(req, res) => {
  console.log('body', req.body)
  const newListEntry = await ReadingList.create(req.body)
  console.log('blog', newListEntry)
  return res.json(newListEntry)
})

router.put('/:id', async (req, res) => {
  if(!req.body.readingState){
    throw new Error("readingState not defined in request body")
  }
  let listEntry = await ReadingList.findByPk(req.params.id)
  if(!listEntry){
    throw new Error(`could not find ReadingList entry with this id: ${req.params.id}`)
  }
  listEntry.readingState = req.body.readingState
  await listEntry.save()
  res.json(listEntry)
})

module.exports = router