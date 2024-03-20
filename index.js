require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(encodeURI(process.env.PGHOST))

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author:{
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  likes:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
  let blogs = await Blog.findAll()
  console.log(blogs)
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  console.log('req.body', req.body)
  try {
    const blog = await Blog.create(req.body)
    console.log(blog)
    return res.json(blog)
  } catch(error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})