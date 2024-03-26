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

module.exports = router